We want simple haskell.
We don't need GADTs or dependent types right now. 
We can have them when their practicality is widely understood.
Pure Functions, ADTs, Type Classes and Polymorphism are all we need - and they're plenty.

We need to remove unnecessary overhead.
There should be no "one true way" to solve a problem.
But there should be "one true way" to write a solution.
We need no infix operators or associativity hacks.
We need no operators beyond those recognizable by kindergarteners.
We need no language extensions - add them to the language or don't.

We need solid and practical build tools, built for today.
They need to be fast.
They need to be disk-efficient.
They need to keep our environments clean.
They need to support easy dependency management. 
They need to support auto-reloads.
Think cargo + cargo-edit.

We need a standard formatter, with minimal or no configuration.
Our style should be simple and familiar.

We need to compile to JS or WASM. The web is here. It's staying.
