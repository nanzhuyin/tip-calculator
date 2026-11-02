# Reflection

Completing this tip calculator task helped me understand that a page's appearance, calculation logic, and input validation all need to be checked. Even when a webpage opens correctly, its results should be verified using specific test data, and its behavior with invalid inputs should also be tested.

Points to watch include:

- **Empty inputs:** JavaScript converts `Number("")` to `0`, so the code needs to check separately whether an input is empty before performing calculations.
- **Valid input ranges:** The bill amount must not be negative, and the number of people must be a whole number of at least 1. A bill amount of zero is acceptable.
- **Monetary precision:** The tip, total, and amount per person should all be displayed to two decimal places. For example, a bill of 80, a tip of 15%, and 3 people should produce 12.00, 92.00, and 30.67. Rounding can cause a small difference between the sum of the displayed individual shares and the total bill.
- **Updating results:** When an input changes, the previous result should be cleared or hidden to prevent it from being mistaken for the current result.
- **Checking the published website:** After uploading the website, the live link should be opened to confirm that the page and JavaScript file load correctly and that the Calculate button works.

Through this task, I learned that testing both normal inputs and edge cases helps identify problems that are easy to overlook when only checking a page's appearance.
