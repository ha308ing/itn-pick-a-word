# a Game "Pick a word"

[![625982.gif](https://i.postimg.cc/GmQj20Sv/625982.gif)](https://postimg.cc/Snn9TP4K)

## How To Play

-   start the game with `npm run start <...at least three words to play with (not even qty)>`
-   computer's move:
    -   generate sha-256 **key**
    -   pick a **word**
    -   generate **hmac** hash from the word and the key
-   players's move:
    -   pick a work by index
    -   `?` - to show winning moves
    -   `0` - to exit
-   see the results
-   verify computer's move:
    -   take the **key** and computer's **word**
    -   go to a [website](https://www.freeformatter.com/hmac-generator.html) to generate **hmac** hash
    -   compare with **hmac** printed in the game (should match)
