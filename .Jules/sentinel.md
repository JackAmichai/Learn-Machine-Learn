## 2024-05-22 - [Pattern] Configuration Whitelisting
**Vulnerability:** Input Configuration Validation
**Learning:** Complex libraries like TF.js may behave unpredictably with invalid string configuration (activations/optimizers).
**Prevention:** Enforce strict whitelists for all configuration strings (activations, optimizers) at the class boundary (NeuralNetwork.js) and fallback to safe defaults.
