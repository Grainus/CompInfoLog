import time
import sys

lines = (
   ("im", "port", " this", " as", " this"),
   ("read", " this", " beau", "ti", "ful", " po", "em"),
   ("and", " fo", "llow", " its", " heart.")
)

for line in lines:
    for item in line:
        print(item, end="", )
        sys.stdout.flush()
        time.sleep(0.35)
    print()
    sys.stdout.flush()
    time.sleep(0.6)

print()
time.sleep(1.5)
import this as this