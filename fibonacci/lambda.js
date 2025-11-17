// Logic
let FALSE = a => b => b;
let TRUE = a => b => a;

let ISZERO = n => n(x => FALSE)(TRUE);

// Numerals
let ZERO = FALSE;
let ONE = f => x => f(x);

// Pairs
let PAIR = x => y => f => f (x) (y);
let FIRST = p => p (TRUE);
let SECOND = p => p (FALSE);

// Math
let SUCC = x => f=> a => f(x(f)(a));
let PLUS = m => n => f => x => m (f) (n (f) (x));

// Transform a pair (a, b) into (b, b+1)
let shiftinc = x => PAIR (SECOND (x)) (SUCC (SECOND (x)));
let PRED = n => FIRST (n (shiftinc) (PAIR (ZERO) (ZERO)));

// Y combinator for recursion with delayed execution
let Y = f => (x => _ => f(x(x)))(x => _ => f(x(x)));

// Recursive definition of Fibonacci
let Fib = n => Y(
    f => m => (ISZERO(m))(x => ONE)(
        x => PLUS(f()(PRED(m)))(f()(PRED(PRED(m))))
    )()
)()(PRED(PRED(n)));

// Iterative definition of Fibonacci
let PAIRFIB = p => PAIR (SECOND (p)) (PLUS (FIRST (p)) (SECOND (p)));
let Fib2 = n =>  FIRST (n (PAIRFIB) (PAIR (FALSE) (ONE)));

// Fully Beta-reduced form
let Fib2Beta = n => (
    n (
        p => (
            f => f (p (a => b => b))
            ((f => x => (p (a => b => a)) (f) ((p (a => b => b)) (f) (x))) )
        )  
    ) (f => f (a => b => b) (f => x => f(x)))
)(a => b => a) ;

// Allows turning an integer into a Church numeral
let BUILD = x => x ? SUCC(BUILD(x-1)) : ZERO;
// Allows turning a Church numeral into an integer
let UNWRAP = x => x(a => a + 1)(0);

let n = 30;  // Which term of the sequence to compute
const a = performance.now();
console.log(UNWRAP(Fib2(BUILD(n))));
const b = performance.now();
console.log('It took ' + (b - a) + ' ms.');
