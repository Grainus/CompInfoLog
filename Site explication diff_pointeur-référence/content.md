TODO intro

> Whole document should be in darkmode

## Syntaxe

Commençons par observer comment fonctionne la syntaxe des pointeurs et des références. Chacun opère en tant que relation à un espace mémoire, mais utilise des symboles différents.

> both following sections are shown at the same time

### Pointeur
> (goes left)
```cpp
int main(int argc, char* argv[]) {
    int value = 17;

    int* ptr = &value;
}
```
> (scrolling highlights the following parts and shows explanation close to it. only one instance of the code is shown on screen at a time, and it stays fixed in place, with changed being animated)
```cpp
int main(int argc, char* argv[]) {
    int value = 17;

    <int* ptr> = &value;
    La variable `ptr` est de type `pointeur vers int`
}
```
```cpp
int main(int argc, char* argv[]) {
    int value = 17;

    int* ptr = <&value>;
    La variable `ptr` est assignée la valeur <addresse de value>
```

### Référence
> (goes right)
```cpp
int main(int argc, char* argv[]) {
    int value = 17;

    int& ref = value;
}
```
> (scrolling trick again)
```cpp
int main(int argc, char* argv[]) {
    int value = 17;

    <int& ref> = value;
    La variable ref sera un alias ver un int
}
```
```cpp
int main(int argc, char* argv[]) {
    int value = 17;

    int& ref = <value>;
    ref est un alias vers la valeur pointée par value.
}
```

## Valeurs
Il est plus facile de comprendre la différence entre pointeur et référence en observant la valeur des variables, ainsi que l'espace mémoire qu'elles réfèrent.

> Find a way to arrange these in a single screen such that it looks simple to read.
### Variables
value = 17
ref = 17
ptr = 0xA

### Addresses
0xA = 17, is pointed by value and ref
0xB = 0xA, is pointed by ptr


> here scrolling show the background getting progressively slightly darker, then faint text appears saying "We need to go deeper". Aesthetically getting to this section must feel like "diving" into the internals.

# Implémentation assembleur

Pour être vraiment certain de connaître la différence entre pointeur et référence, on peut regarder au code assembleur généré par chaque exemple pour le comparer.

## Variable simple
Commençons par observer ce qui se passe sous le capot pour une simple variable dans la fonction main.

### Pointeur
> This will take roughly the upper half portion of the screen. This time the C++ code goes on the left and the assembly code goes on the right. The boilerplate parts of the code are less opaque to highlight the important parts.
```cpp
int main(int argc, char* argv[]) {
    int value = 17;
    int* ptr = &value;  > highlighted

    return 0;
}
```

```asm
main:
        push    rbp
        mov     rbp, rsp
        mov     DWORD PTR [rbp-20], edi
        mov     QWORD PTR [rbp-32], rsi
        mov     DWORD PTR [rbp-12], 17
        lea     rax, [rbp-12]  > highlighted
        mov     QWORD PTR [rbp-8], rax  > highlighted
        mov     eax, 0
        pop     rbp
        ret
```

### Référence
```cpp
int main(int argc, char* argv[]) {
    int value = 17;
    int& ref = value;  > highlighted

    return 0;
}
```

```asm
main:
        push    rbp
        mov     rbp, rsp
        mov     DWORD PTR [rbp-20], edi
        mov     QWORD PTR [rbp-32], rsi
        mov     DWORD PTR [rbp-12], 17
        lea     rax, [rbp-12]  > highlighted
        mov     QWORD PTR [rbp-8], rax  > highlighted
        mov     eax, 0
        pop     rbp
        ret
```

## Arguments de fonctions

On peut voir la même chose se produire quand on compare une fonction qui prend un pointeur et une fonction qui prend une référence:

### Pointeur
> same alignment as last time
```cpp
void func(int* ptr  > highlighted1) {
    *ptr = 17;  > highlighted2

    return;
}
```

```asm
func(int*):
        push    rbp
        mov     rbp, rsp
        mov     QWORD PTR [rbp-8], rdi  > highlighted1
        mov     rax, QWORD PTR [rbp-8]  > highlighted2
        mov     DWORD PTR [rax], 17  > highlighted2
        nop
        pop     rbp
        ret
```

### Référence
```cpp
void func(int& ptr  > highlighted1) {
    ptr = 17;  > highlighted2

    return;
}
```

```asm
func(int&):
        push    rbp
        mov     rbp, rsp
        mov     QWORD PTR [rbp-8], rdi  > highlighted1
        mov     rax, QWORD PTR [rbp-8]  > highlighted2
        mov     DWORD PTR [rax], 17  > highlighted2
        nop
        pop     rbp
        ret
```

## Structs

Juste pour être certain, observons ce qui se passe lorsqu'on a un pointeur ou une référence vers un membre d'un struct.

### Pointeur
```cpp
struct Exemple {
    int value;
};

int main(int argc, char* argv[]) {
    Exemple ex = { 17 };
    int* ptr = &ex.value;  > highlighted

    return 0;
}
```

```asm
main:
        push    rbp
        mov     rbp, rsp
        mov     DWORD PTR [rbp-20], edi
        mov     QWORD PTR [rbp-32], rsi
        mov     DWORD PTR [rbp-12], 17
        lea     rax, [rbp-12]  > highlighted
        mov     QWORD PTR [rbp-8], rax  > highlighted
        mov     eax, 0
        pop     rbp
        ret
```

### Réréfence
```cpp
struct Exemple {
    int value;
};

int main(int argc, char* argv[]) {
    Exemple ex = { 17 };
    int& ref = ex.value;  > highlighted

    return 0;
}
```

```asm
main:
        push    rbp
        mov     rbp, rsp
        mov     DWORD PTR [rbp-20], edi
        mov     QWORD PTR [rbp-32], rsi
        mov     DWORD PTR [rbp-12], 17
        lea     rax, [rbp-12]  > highlighted
        mov     QWORD PTR [rbp-8], rax  > highlighted
        mov     eax, 0
        pop     rbp
        ret
```


## Révélation
Dans tous les cas, les deux codes produisent exactement les mêmes instructions assembleur. Il n'y aurait donc aucune différence aux yeux de la machine?

En effet, la différence entre un pointeur et une référence existe seulement avant que le programme soit compilé. À l'interne, une référence est traitée comme un pointeur normal, et le compilateur C++ ajoutera automatiquement les opérations de déréférence lorsqu'on utilise la variable. Cela ne veut pas dire que les deux sont identiques dans leur usage.

# Différences

Bien qu'ils soient identiques après compilation, le langage C++ impose des règles différentes pour leur utilisation:

> Show as a table
## Pointeur
- Peut être nul (nullptr)
- Peut être réassigné
- Peut être non-initialisé
- Supporte l'arithmétique

## Référence
- Doit toujours être valide
- Liée à vie à sa variable
- Doit être initialisée
- Pas d'arithmétique directe