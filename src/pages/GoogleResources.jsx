import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function GoogleResources() {
  const lessons = {
    foundation: {
      title: "Lesson 1: Foundations of ML",
      overview: `Machine learning is about teaching computers to learn from data, rather than explicitly programming rules. 
        This section covers the fundamental concepts that every ML practitioner needs: from basic prediction with linear models 
        to the mathematical foundations of optimization. You'll learn how machines make predictions, measure their own 
        errors, and improve over time through data.`,
      whatYouLearn: [
        "How machines learn from data through examples",
        "The difference between supervised, unsupervised, and reinforcement learning",
        "Basic prediction: from lines (linear regression) to probabilities (logistic regression)",
        "How to measure error and improve predictions"
      ],
      nextUp: "In the next lessons, we'll see how to train these models with data, starting with the first neural networks.",
      skills: ["Linear Regression", "Logistic Regression", "Loss Functions", "Basic Optimization"]
    },
    history: {
      title: "Lesson 2: History of ML - How We Got Here",
      overview: `Understanding the history of ML helps you understand why certain techniques exist. This timeline shows the key inventions 
        from the 1950s to today - from Turing's original question to modern Transformers. You'll see how each breakthrough solved 
        problems that held the field back, and how ideas from the 1960s finally became practical in the 1990s.`,
      whatYouLearn: [
        "The key inventions that unlock each era",
        "Why ideas from the 1960s took 30 years to become practical",
        "Who built on whose work (the intellectual lineage)",
        "What problems each breakthrough solved"
      ],
      nextUp: "Now let's see how the first neural networks worked - backpropagation!",
      skills: ["Timeline", "Intellectual Lineage", "Problem-Solving Evolution"]
    },
    neural: {
      title: "Lesson 3: Neural Networks & Backpropagation",
      overview: `Neural networks are the foundation of modern ML. This section shows how backpropagation - the algorithm that trains 
        neural networks - was discovered and refined. You'll see how a simple idea (gradient descent) became the engine behind 
        everything from AlphaGo to GPT-4. The key insight: networks can learn their own features from data.`,
      whatYouLearn: [
        "How neurons process information (inspired by biology)",
        "Backpropagation: how networks learn from errors",
        "Why this took 20+ years to become practical",
        "Deep vs shallow networks"
      ],
      nextUp: "Now let's see how these ideas apply to images with convolutional neural networks.",
      skills: ["Backpropagation", "Gradient Descent", "Feature Learning", "Deep Networks"]
    },
    cnn: {
      title: "Lesson 4: Computer Vision - Teaching Machines to See",
      overview: `Computer vision changed ML forever. From recognizing handwritten digits to detecting tumors, vision systems 
        now match or exceed human performance. This section traces the journey from Neocognitron (1980) to Vision 
        Transformers (2021). The key insight: local patterns (edges) combine into global concepts (faces).`,
      whatYouLearn: [
        "How convolution extracts local features",
        "From LeNet (1998) to ResNet (2015) to ViT (2021)",
        "Why more layers sometimes hurt performance (and skip connections fix it)",
        "Key architectures: AlexNet, VGG, Inception, ResNet, EfficientNet"
      ],
      nextUp: "Next: how machines understand sequences - text, speech, time series.",
      skills: ["Convolution", "Pooling", "Skip Connections", "Vision Architectures"]
    },
    sequence: {
      title: "Lesson 5: Sequence Models - Understanding Time",
      overview: `The world is full of sequences: language, speech, music, stock prices. This section covers how machines process sequences 
        of varying length. From simple RNNs to LSTMs (that remember long-term) to attention (that processes everything in parallel). 
        The key insight: sequential processing can be done in parallel with attention.`,
      whatYouLearn: [
        "How to handle variable-length sequences",
        "RNNs, LSTMs, and GRUs: managing memory",
        "The problem machines had with long sequences",
        "How attention changed everything"
      ],
      nextUp: "Now the foundation for modern NLP: Transformers!",
      skills: ["RNN", "LSTM", "GRU", "Attention"]
    },
    svm: {
      title: "Lesson 6: SVMs - The Pre-Deep Learning Champion",
      overview: `Before deep learning took over, SVMs (Support Vector Machines) were the method to beat. 
        This section covers their history and why they dominated ML for 15 years. The key insight: finding the 
        maximum-margin hyperplane and the "kernel trick" for non-linear boundaries.`,
      whatYouLearn: [
        "Maximum margin classification",
        "The kernel trick: projecting to higher dimensions",
        "Why SVMs worked so well on small data",
        "When to still use SVMs today"
      ],
      nextUp: "Let's look at how to generate new data: GANs!",
      skills: ["Margin", "Kernels", "Linear Separation", "RBF Kernels"]
    },
    gan: {
      title: "Lesson 7: GANs - Game Theory Meets ML",
      overview: `Generative Adversarial Networks (GANs) introduced a revolutionary idea: two networks competing. 
        The generator creates fakes, the discriminator judges them. Like a detective vs counterfeiter, 
        both improve. This led to photorealistic face generation and more.`,
      whatYouLearn: [
        "The generator vs discriminator game",
        "How GANs learn to create new data",
        "Key variations: DCGAN, WGAN, StyleGAN",
        "Why training can be unstable"
      ],
      nextUp: "Next: even more powerful generative models - VAEs and Diffusion!",
      skills: ["Generator", "Discriminator", "Game Theory", "Mode Collapse"]
    },
    diffusion: {
      title: "Lesson 8: Diffusion Models - The New Frontier",
      overview: `Diffusion models now generate the highest quality images. The idea: gradually add noise, 
        then learn to reverse the process. Combined with language, this gives us Stable Diffusion, DALL-E, Imagen. 
        The key insight: learn to denoise, no adversarial game needed.`,
      whatYouLearn: [
        "Forward vs reverse diffusion process",
        "Why diffusion beats GANs in quality",
        "Text-to-image: combining with language models",
        "Latent diffusion for efficiency"
      ],
      nextUp: "The biggest revolution: Transformers!",
      skills: ["Denoising", "Latent Space", "Text-to-Image", "Guidance"]
    },
    transformer: {
      title: "Lesson 9: Transformers - Attention Is All You Need",
      overview: `The Transformer architecture changed everything. Originally for language translation, it became the foundation 
        for GPT, BERT, and 95% of modern LLMs. The key insight: self-attention processes ALL positions in parallel, 
        capturing long-range dependencies without recurrence. This is the most important architecture in ML history.`,
      whatYouLearn: [
        "Self-attention: each position attends to all others",
        "Multi-head: multiple relationship types at once",
        "Positional encoding: giving order to sequences",
        "Encoder vs Decoder vs Encoder-Decoder"
      ],
      nextUp: "Let's see how to train these efficiently!",
      skills: ["Self-Attention", "Multi-Head", "Positional Encoding", "Transformer Architecture"]
    },
    optimization: {
      title: "Lesson 10: Training Deep Networks - Optimizers",
      overview: `How do you actually train a deep network? This section covers the optimization algorithms from SGD (1964) 
        to Adam (2014) to modern techniques. The key insight: different optimizers work better for different architectures. 
        You'll learn when to use each and common pitfalls.`,
      whatYouLearn: [
        "SGD, Momentum, and learning rate schedules",
        "Adam: adaptive moment estimation",
        "AdamW: fixing weight decay",
        "Advanced: LAMB, Sharpness-Aware Minimization"
      ],
      nextUp: "Now let's see how machines can learn from interaction: Reinforcement Learning!",
      skills: ["SGD", "Adam", "Learning Rate", "Momentum"]
    },
    rl: {
      title: "Lesson 11: Reinforcement Learning - Learning by Doing",
      overview: `How did AlphaGo beat the world champion? Reinforcement Learning (RL). The agent learns from rewards 
        and punishments through interaction. This section traces from Q-learning (1989) to AlphaGo (2016) to 
        modern RLHF that aligns LLMs with human preferences.`,
      whatYouLearn: [
        "The agent-environment-reward loop",
        "Q-learning: estimating future rewards",
        "Policy gradients: learning actions directly",
        "AlphaGo: combining tree search with deep learning"
      ],
      nextUp: "Next: how to adapt big models to new tasks with transfer learning!",
      skills: ["Q-Learning", "Policy Gradients", "Rewards", "Exploration"]
    },
    transfer: {
      title: "Lesson 12: Transfer Learning - One Model, Many Tasks",
      overview: `Why train from scratch when you can adapt? Transfer learning lets us take a model trained on massive data 
        and fine-tune for specific tasks. This covers techniques from feature extraction (1990s) to LoRA (2021). 
        This is how modern LLMs are adapted to new tasks.`,
      whatYouLearn: [
        "Feature extraction vs fine-tuning",
        "How much to freeze vs train",
        "Efficient methods: LoRA, Adapters, Prefix Tuning",
        "When transfer works and when it doesn't"
      ],
      nextUp: "The cutting edge: connecting vision, language, and more!",
      skills: ["Fine-tuning", "LoRA", "Adapters", "Prompt Tuning"]
    },
    multimodal: {
      title: "Lesson 13: Multimodal & Foundation Models",
      overview: `The new frontier: models that see, hear, and speak. From CLIP (connecting images to text) to GPT-4V (vision + language) 
        to SAM (segment anything). These "foundation models" are trained on massive data and can generalize broadly. 
        This is where ML is heading.`,
      whatYouLearn: [
        "Connecting vision and language (CLIP)",
        "Foundation models vs specialized models",
        "From any-to-any multimodal generation",
        "Where the field is heading"
      ],
      nextUp: "You're ready to explore! Start with the foundational lessons and build up.",
      skills: ["CLIP", "Foundation Models", "Zero-Shot", "Multimodal"]
    }
  };

  const resources = {
    foundational: [
      { title: "Introduction to Machine Learning", url: "https://developers.google.com/machine-learning/intro-to-ml", desc: "A brief introduction to machine learning concepts.", type: "course" },
      { title: "Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", desc: "Hands-on with ML fundamentals from Google researchers.", type: "course" },
      { title: "CS229: Machine Learning (Stanford)", url: "https://cs229.stanford.edu/", desc: "Andrew Ng's legendary course. The foundation for millions.", type: "course" },
      { title: "3Blue1Brown: Neural Networks", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMs2vMmR2T__GonN5iXJzfe", desc: "Visual intuition for backpropagation.", type: "video" },
      { title: "Fast.ai: Practical Deep Learning", url: "https://course.fast.ai/", desc: "Jeremy Howard's top-down approach.", type: "course" },
      { title: "Pattern Recognition and ML", url: "https://www.springer.com/us/book/9780387310824", desc: "Christopher Bishop's textbook. The mathematical foundation.", type: "book" },
      { title: "The Elements of Statistical Learning", url: "https://link.springer.com/book/10.1007/978-0-387-84858-7", desc: "Hastie, Tibshirani, Friedman. The classic reference.", type: "book" },
      { title: "MIT 6.034: Artificial Intelligence", url: "https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/", desc: "Turing through modern AI. Comprehensive overview.", type: "course" }
    ],
    foundationalPapers: [
      { title: "Computing Machinery and Intelligence", url: "https://academic.oup.com/mind/article/LIX/433/433/3682382", desc: "Turing (1950). Proposes the Turing Test.", year: 1950, author: "Alan Turing" },
      { title: "The Perceptron: A Probabilistic Model", url: "https://psycnet.apa.org/doi/10.1037/h0042515", desc: "Rosenblatt (1957). The first artificial neuron.", year: 1957, author: "Frank Rosenblatt" },
      { title: "The Perceptron: A Theory", url: "https://journals.sagepub.com/doi/10.1080/00018705900140010", desc: "Minsky & Papert (1969). Proves perceptron limitations.", year: 1969, author: "Minsky & Papert" },
      { title: "Adaptive ADALINE", url: "https://ieeexplore.ieee.org/document/4038651", desc: "Widrow & Hoff (1960). The delta rule.", year: 1960, author: "Bernard Widrow" },
      { title: "Nearest Neighbor Pattern Classifier", url: "https://ieeexplore.ieee.org/document/4037082", desc: "Cover & Hart (1967). KNN theoretical foundations.", year: 1967, author: "Cover & Hart" },
      { title: "Theory of the Backpropagation Method", url: "https://www.researchgate.net/publication/2405530", desc: "Werbos (1974). First proof of backpropagation.", year: 1974, author: "Paul Werbos" },
      { title: "Hierarchical Production Systems", url: "https://www.sciencedirect.com/science/article/abs/pii/0004370287900320", desc: "Newell (1973). Early production systems.", year: 1973, author: "Allen Newell" },
      { title: "General Problem Solver", url: "https://dl.acm.org/doi/10.1145/174059.137184", desc: "Newell & Simon (1957). The first AI program.", year: 1957, author: "Newell & Simon" },
      { title: "Constraint Satisfaction", url: "https://link.springer.com/article/10.1007/BF01890195", desc: " Waltz (1975). Early constraint satisfaction.", year: 1975, author: "David Waltz" },
      { title: "Learning in Automata", url: "https://link.springer.com/article/10.1007/BF01890050", desc: "Sklar (1974). Learning in finite automata.", year: 1974, author: "Sklar" },
      { title: "Inductive Learning Systems", url: "https://link.springer.com/article/10.1007/BF00889196", desc: "Michalski (1975). Theory of inductive learning.", year: 1975, author: "Ryszard Michalski" },
      { title: "Learning in Boltzmann Machines", url: "https://www.sciencedirect.com/science/article/abs/pii/0748108786900079", desc: "Hinton & Sejnowski (1983). Stochastic units.", year: 1983, author: "Hinton & Sejnowski" },
      { title: "Connectionist Models", url: "https://mitpress.mit.edu/books/connectionist-models", desc: "Rumelhart & McClelland (1986). PDP.", year: 1986, author: "Rumelhart & McClelland" },
      { title: "Hopfield Networks", url: "https://link.aps.org/doi/10.1103/PhysRevLett.47.2008", desc: "Hopfield (1982). Associative memory.", year: 1982, author: "John Hopfield" },
      { title: "Boltzmann Machines", url: "https://books.google.com/books/about/Boltzmann_Machines.html", desc: "Ackley, Hinton, Sejnowski (1985).", year: 1985, author: "Ackley, Hinton, Sejnowski" }
    ],
    neuralNetworkPapers: [
      { title: "Learning Representations by Back-propagating Errors", url: "https://www.nature.com/articles/323533a0", desc: "Rumelhart, Hinton, Williams (1986). The Nature paper.", year: 1986, author: "Rumelhart, Hinton, Williams" },
      { title: "A Learning Algorithm for Boltzmann Machines", url: "https://www.cs.toronto.edu/~hinton/absps/cogscibm.pdf", desc: "Hinton (1986). Modern backprop.", year: 1986, author: "Geoffrey Hinton" },
      { title: "Parallel Distributed Processing Vol 1", url: "https://mitpress.mit.edu/books/parallel-distributed-processing", desc: "Rumelhart, McClelland (1986). PDP foundations.", year: 1986, author: "Rumelhart & McClelland" },
      { title: "Backprop through Time", url: "https://onlinelibrary.wiley.com/doi/10.1002/ana.410210310", desc: "Werbos (1988). BPTT for RNNs.", year: 1988, author: "Paul Werbos" },
      { title: "Learning Hidden Layer Representations", url: "https://www.researchgate.net/publication/2328580", desc: "Rumelhart (1986). Autoencoders.", year: 1986, author: "David Rumelhart" },
      { title: "Feature Discovery", url: "https://mitpress.mit.edu/books/connectionist-models", desc: "Rumelhart & Zipser (1986). Competitive learning.", year: 1986, author: "Rumelhart & Zipser" },
      { title: "Adaptive Resonance Theory", url: "https://journals.sagepub.com/doi/10.1177/2167702615621583", desc: "Grossberg (1976). ART networks.", year: 1976, author: "Stephen Grossberg" },
      { title: "Generalization in Neural Networks", url: "https://www.researchgate.net/publication/2341694", desc: "Tesauro (1987). Early analysis.", year: 1987, author: "Gerald Tesauro" },
      { title: "Learning Internal Representations by Error Propagation", url: "https://www.researchgate.net/publication/2651485", desc: "Parker (1987). Independent backprop.", year: 1987, author: "David Parker" },
      { title: "Neural Network VS Recognition", url: "https://www.researchgate.net/publication/2651485", desc: "LeCun (1987). Early applications.", year: 1987, author: "Yann LeCun" }
    ],
    cnnPapers: [
      { title: "Neocognitron: Self-Organizing CNN", url: "https://www.researchgate.net/publication/233816132", desc: "Fukushima (1980). First conv network.", year: 1980, author: "Kunihiko Fukushima" },
      { title: "Neural Network for Visual Recognition", url: "https://www.researchgate.net/publication/2651485", desc: "LeCun (1989). Backprop on documents.", year: 1989, author: "Yann LeCun" },
      { title: "LeNet: Conv Networks", url: "https://ieeexplore.ieee.org/document/726791", desc: "LeCun et al. (1989). Gradient-based learning.", year: 1989, author: "LeCun et al." },
      { title: "LeNet-5: Conv Networks for Handwriting", url: "https://doi.org/10.1162/neco.1997.9.2.359", desc: "LeCun et al. (1998). Classic architecture.", year: 1998, author: "LeCun et al." },
      { title: "Gradient-Based Learning applied to OCR", url: "http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf", desc: "LeCun et al. (1998). Comprehensive tutorial.", year: 1998, author: "LeCun et al." },
      { title: "ImageNet Classification with Deep CNNs", url: "https://doi.org/10.1145/2999611.2999624", desc: "AlexNet (2012). ImageNet breakthrough.", year: 2012, author: "Krizhevsky, Sutskever, Hinton" },
      { title: "Very Deep Conv Networks for ImageNet", url: "https://arxiv.org/abs/1409.1556", desc: "VGG-16 (2014). Simple deep architecture.", year: 2014, author: "Simonyan & Zisserman" },
      { title: "Deep Residual Learning (ResNet)", url: "https://arxiv.org/abs/1512.03385", desc: "He et al. (2015). Skip connections.", year: 2015, author: "Kaiming He et al." },
      { title: "Batch Normalization", url: "https://arxiv.org/abs/1502.03167", desc: "Ioffe & Szegedy (2015). Normalization.", year: 2015, author: "Sergey Ioffe, Christian Szegedy" },
      { title: "Going Deeper with Convolutions", url: "https://arxiv.org/abs/1409.4842", desc: "Inception (2015). Multi-scale processing.", year: 2015, author: "Szegedy et al." },
      { title: "Densely Connected Conv Networks", url: "https://arxiv.org/abs/1608.06993", desc: "DenseNet (2017). Dense connections.", year: 2017, author: "Huang et al." },
      { title: "MobileNetV1: Efficient Conv", url: "https://arxiv.org/abs/1704.04861", desc: "Howard et al. (2017). Depthwise separable.", year: 2017, author: "Andrew Howard" },
      { title: "EfficientNet: Compound Scaling", url: "https://arxiv.org/abs/1905.11946", desc: "Tan & Le (2019). Compound scaling.", year: 2019, author: "Mingxing Tan" },
      { title: "Vision Transformer (ViT)", url: "https://arxiv.org/abs/2010.11929", desc: "Dosovitskiy et al. (2021). Transformers for images.", year: 2021, author: "Dosovitskiy et al." }
    ],
    sequencePapers: [
      { title: "Simple Recurrent Networks", url: "https://www.sciencedirect.com/science/article/abs/pii/0920279087900414", desc: "Elman (1990). Simple RNN.", year: 1990, author: "Jeffrey Elman" },
      { title: "Long Short-Term Memory", url: "https://doi.org/10.1162/neco.1997.9.8.1735", desc: "Hochreiter & Schmidhuber (1997). LSTM.", year: 1997, author: "Sepp Hochreiter, Jürgen Schmidhuber" },
      { title: "A Connectionist Temporal Classifier", url: "https://www.cs.toronto.edu/~graves/icml_2006.pdf", desc: "Graves et al. (2006). CTC loss.", year: 2006, author: "Alex Graves" },
      { title: "Neural Machine Translation", url: "https://arxiv.org/abs/1409.0473", desc: "Bahdanau et al. (2014). Additive attention.", year: 2014, author: "Bahdanau et al." },
      { title: "Effective Approaches to Attention", url: "https://arxiv.org/abs/1508.04025", desc: "Luong et al. (2015). Multiplicative attention.", year: 2015, author: "Minh-Thang Luong" },
      { title: "Learning Phrase Representations", url: "https://arxiv.org/abs/1406.1078", desc: "Cho et al. (2014). GRU and encoder-decoder.", year: 2014, author: "Cho et al." },
      { title: "Speech Recognition with Deep RNNs", url: "https://www.researchgate.net/publication/2545824", desc: "Graves & Jaitly (2013). End-to-end speech.", year: 2013, author: "Alex Graves" },
      { title: "Show, Attend and Tell", url: "https://arxiv.org/abs/1502.03044", desc: "Xu et al. (2015). Image captioning.", year: 2015, author: "Xu et al." },
      { title: "WaveNet: Generative TTS", url: "https://arxiv.org/abs/1609.03499", desc: "Van den Oord (2016). Autoregressive.", year: 2016, author: "Van den Oord et al." }
    ],
    svmPapers: [
      { title: "Support Vector Networks", url: "https://doi.org/10.1006/imau.1996.0009", desc: "Cortes & Vapnik (1995). Soft margins.", year: 1995, author: "Corinna Cortes, Vladimir Vapnik" },
      { title: "Kernel PCA", url: "https://link.springer.com/article/10.1007/s00521-004-0571-x", desc: "Schölkopf et al. (1998). Kernel PCA.", year: 1998, author: "Schölkopf et al." },
      { title: "Kernel Fisher Discriminant", url: "https://link.springer.com/article/10.1007/s00521-004-0571-x", desc: "Mika et al. (1999). Kernel FDA.", year: 1999, author: "Mika et al." },
      { title: "Gaussian Processes for Classification", url: "https://link.springer.com/article/10.1023/A:1012673507861", desc: "Williams & Rasmussen (1999). GP classification.", year: 1999, author: "Williams & Rasmussen" },
      { title: "SMO: Sequential Minimal Optimization", url: "https://link.springer.com/article/10.1023/A:1007518107543", desc: "Platt (1999). Scalable SVMs.", year: 1999, author: "John Platt" },
      { title: "LIBSVM: A Library for SVMs", url: "https://www.csie.ntu.edu.tw/~cjlin/papers/libsvm.pdf", desc: "Chang & Lin (2011). The standard library.", year: 2011, author: "Chang & Lin" },
      { title: "Least Squares SVMs", url: "https://link.springer.com/article/10.1023/A:1012488606961", desc: "Suykens & Vandewalle (1999). LS-SVM.", year: 1999, author: "Suykens & Vandewalle" },
      { title: "Relevance Vector Machines", url: "https://link.springer.com/article/10.1023/A:1009543217086", desc: "Tipping (2001). Sparse GP.", year: 2001, author: "Michael Tipping" },
      { title: "One-Class SVM", url: "https://link.springer.com/article/10.1023/A:1009103923984", desc: "Schölkopf et al. (2001). Anomaly detection.", year: 2001, author: "Schölkopf et al." },
      { title: "Ranking SVM", url: "https://link.springer.com/article/10.1023/A:1008556319693", desc: "Joachims (2002). Learning to rank.", year: 2002, author: "Thorsten Joachims" }
    ],
    ganPapers: [
      { title: "GANs: Generative Adversarial Networks", url: "https://arxiv.org/abs/1406.2661", desc: "Goodfellow (2014). Generator vs Discriminator.", year: 2014, author: "Ian Goodfellow" },
      { title: "Wasserstein GAN", url: "https://arxiv.org/abs/1701.07875", desc: "Arjovsky et al. (2017). Better stability.", year: 2017, author: "Arjovsky et al." },
      { title: "Improved GAN Training", url: "https://arxiv.org/abs/1706.08500", desc: "Salimans et al. (2016). Practical tips.", year: 2016, author: "Salimans et al." },
      { title: "LSGAN: Least Squares GAN", url: "https://arxiv.org/abs/1611.04076", desc: "Mao et al. (2016). Less collapse.", year: 2016, author: "Mao et al." },
      { title: "Progressive Growing of GANs", url: "https://arxiv.org/abs/1710.10196", desc: "Karras et al. (2017). Progressive growing.", year: 2017, author: "Karras et al." },
      { title: "StyleGAN: Style-based Generation", url: "https://arxiv.org/abs/1812.04948", desc: "Karras et al. (2018). Style-based.", year: 2018, author: "Karras et al." },
      { title: "CycleGAN: Unpaired Translation", url: "https://arxiv.org/abs/1703.10593", desc: "Zhu et al. (2017). Unpaired translation.", year: 2017, author: "Zhu et al." },
      { title: "pix2pix: Image-to-Image", url: "https://arxiv.org/abs/1611.07004", desc: "Isola et al. (2016). Conditional GANs.", year: 2016, author: "Isola et al." },
      { title: "BigGAN: Large Scale", url: "https://arxiv.org/abs/1809.11096", desc: "Brock et al. (2018). Large scale.", year: 2018, author: "Brock et al." },
      { title: "Self-Attention GAN", url: "https://arxiv.org/abs/1805.08318", desc: "Zhang et al. (2018). SAGAN.", year: 2018, author: "Zhang et al." }
    ],
    diffusionPapers: [
      { title: "Auto-Encoding Variational Bayes", url: "https://arxiv.org/abs/1312.6114", desc: "Kingma & Welling (2014). VAEs.", year: 2014, author: "Kingma & Welling" },
      { title: "Denoising Diffusion Probabilistic Model", url: "https://arxiv.org/abs/2006.11239", desc: "Ho et al. (2020). DDPM.", year: 2020, author: "Ho et al." },
      { title: "Diffusion Models Beat GANs", url: "https://arxiv.org/abs/2105.05233", desc: "Dhariwal & Nichol (2021). Imagen.", year: 2021, author: "Dhariwal & Nichol" },
      { title: "High-Resolution Image Synthesis", url: "https://arxiv.org/abs/2105.05233", desc: "Saharia et al. (2021). Imagen.", year: 2021, author: "Saharia et al." },
      { title: "Stable Diffusion", url: "https://arxiv.org/abs/2112.10752", desc: "Rombach et al. (2021). Latent diffusion.", year: 2021, author: "Rombach et al." },
      { title: "DDIM: Denoising Implicit Models", url: "https://arxiv.org/abs/2010.02502", desc: "Song et al. (2020). Faster sampling.", year: 2020, author: "Song et al." },
      { title: "Score-Based Generative Models", url: "https://arxiv.org/abs/2011.13456", desc: "Song & Ermon (2020). Score matching.", year: 2020, author: "Song & Ermon" },
      { title: "Classifier-Free Guidance", url: "https://arxiv.org/abs/2207.12598", desc: "Ho & Salimans (2022). CFG.", year: 2022, author: "Ho & Salimans" },
      { title: "ControlNet", url: "https://arxiv.org/abs/2302.05543", desc: "Zhang et al. (2023). Conditional.", year: 2023, author: "Zhang et al." },
      { title: "DreamBooth: Personalization", url: "https://arxiv.org/abs/2208.12202", desc: "Ruiz et al. (2022). Personalization.", year: 2022, author: "Ruiz et al." }
    ],
    transformerPapers: [
      { title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", desc: "Vaswani et al. (2017). The Transformer.", year: 2017, author: "Ashish Vaswani et al." },
      { title: "BERT: Pre-training of Bidirectional", url: "https://arxiv.org/abs/1810.04805", desc: "Devlin et al. (2018). Masked LM.", year: 2018, author: "Jacob Devlin et al." },
      { title: "GPT: Improving Language Understanding", url: "https://arxiv.org/abs/1810.04805", desc: "Radford et al. (2018). Generative PT.", year: 2018, author: "Alec Radford et al." },
      { title: "GPT-2: Language Models are Unsupervised", url: "https://arxiv.org/abs/1901.00131", desc: "Radford et al. (2019). Zero-shot.", year: 2019, author: "Alec Radford et al." },
      { title: "GPT-3: Few-Shot Learners", url: "https://arxiv.org/abs/2005.14165", desc: "Radford et al. (2020). 175B params.", year: 2020, author: "Alec Radford et al." },
      { title: "BART: Denoising Sequence-to-Seq", url: "https://arxiv.org/abs/1910.13461", desc: "Lewis et al. (2019). Seq2seq.", year: 2019, author: "Mike Lewis" },
      { title: "T5: Text-to-Text", url: "https://arxiv.org/abs/1910.10683", desc: "Raffel et al. (2019). Unified.", year: 2019, author: "Colin Raffel" },
      { title: "XLNet: Generalized Autoregression", url: "https://arxiv.org/abs/1906.08237", desc: "Yang et al. (2019). Permutation LM.", year: 2019, author: "Yang et al." },
      { title: "RoBERTa: Robust BERT", url: "https://arxiv.org/abs/1907.11692", desc: "Liu et al. (2019). Better PT.", year: 2019, author: "Yinhan Liu" },
      { title: "ELECTRA: Efficient LM Pre-training", url: "https://arxiv.org/abs/2003.10555", desc: "Clark et al. (2020). RTD.", year: 2020, author: "Kevin Clark" },
      { title: "DeBERTa: Decoding-enhanced", url: "https://arxiv.org/abs/2006.03654", desc: "He et al. (2020). Disentangled.", year: 2020, author: "He et al." },
      { title: "LLaMA: Open Foundation Models", url: "https://arxiv.org/abs/2302.13971", desc: "Touvron et al. (2023). Open weights.", year: 2023, author: "Touvron et al." },
      { title: "Mistral 7B", url: "https://arxiv.org/abs/2310.06825", desc: "Jiang et al. (2023). GQA.", year: 2023, author: "Albert Jiang" },
      { title: "Mixtral 8x7B", url: "https://arxiv.org/abs/2401.04088", desc: "Mixtral (2024). MoE.", year: 2024, author: "Mixtral" }
    ],
    optimizationPapers: [
      { title: "Adam: A Method for Stochastic Optimization", url: "https://arxiv.org/abs/1412.6980", desc: "Kingma & Ba (2014). The popular optimizer.", year: 2014, author: "Diederik Kingma, Jimmy Ba" },
      { title: "AdamW: Decoupled Weight Decay", url: "https://arxiv.org/abs/1711.05101", desc: "Loshchilov & Hutin (2017). Decoupled.", year: 2017, author: "Loshchilov & Hutin" },
      { title: "AdaGrad: Adaptive Learning", url: "https://jmlr.org/papers/v12/duchi101a.html", desc: "Duchi et al. (2011). Per-parameter.", year: 2011, author: "John Duchi" },
      { title: "AdaDelta: Adaptive Learning Rate", url: "https://arxiv.org/abs/1212.5701", desc: "Zeiler (2012). No tuning.", year: 2012, author: "Matthew Zeiler" },
      { title: "RMSProp: Divide by Gradient", url: "https://www.cs.toronto.edu/~tijmen/csc321/notes/notes-lecture-6.pdf", desc: "Hinton (2012). Moving average.", year: 2012, author: "Geoffrey Hinton" },
      { title: "SGD with Momentum", url: "https://link.springer.com/article/10.1007/BF00944803", desc: "Polyak (1964). Classical momentum.", year: 1964, author: "Boris Polyak" },
      { title: "Nesterov Accelerated Gradient", url: "https://link.springer.com/article/10.1007/BF00942705", desc: "Nesterov (1983). Speed.", year: 1983, author: "Yurii Nesterov" },
      { title: "L-BFGS: Limited-memory BFGS", url: "https://link.springer.com/article/10.1007/BF00179427", desc: "Nocedal (1980). Quasi-Newton.", year: 1980, author: "Jorge Nocedal" },
      { title: "K-FAC: Kronecker-Factored", url: "https://arxiv.org/abs/1503.05671", desc: "Martens & Grosse (2015). Natural gradient.", year: 2015, author: "Martens & Grosse" },
      { title: "LAMB: Layer-wise Adaptive Moments", url: "https://arxiv.org/abs/1904.00962", desc: "You et al. (2019). Large batch.", year: 2019, author: "Yang You" },
      { title: "Sharpness-aware Minimization", url: "https://arxiv.org/abs/2010.01412", desc: "Foret et al. (2021). SAM.", year: 2021, author: "Foret et al." },
      { title: "Gradient Clipping", url: "https://link.springer.com/article/10.1023/A:1022304006639", desc: "Pascanu et al. (2012). Explosion.", year: 2012, author: "Pascanu et al." }
    ],
    rlPapers: [
      { title: "Q-Learning", url: "https://link.springer.com/article/10.1007/BF00952904", desc: "Watkins (1989). Classic Q-learning.", year: 1989, author: "Chris Watkins" },
      { title: "Temporal Difference Learning", url: "https://link.springer.com/article/10.1007/BF00117827", desc: "Sutton (1988). TD learning.", year: 1988, author: "Richard Sutton" },
      { title: "Actor-Critic Algorithms", url: "https://link.springer.com/article/10.1007/BF00115009", desc: "Barto et al. (1983). Actor-critic.", year: 1983, author: "Barto et al." },
      { title: "AlphaGo: Mastering Go", url: "https://www.nature.com/articles/nature16961", desc: "Silver et al. (2016). Beats Lee Sedol.", year: 2016, author: "Silver et al." },
      { title: "AlphaGo Zero", url: "https://www.nature.com/articles/nature24270", desc: "Silver et al. (2017). Self-play.", year: 2017, author: "Silver et al." },
      { title: "DQN: Human-level Control", url: "https://www.nature.com/articles/14535", desc: "Mnih et al. (2015). Deep Q-networks.", year: 2015, author: "Mnih et al." },
      { title: "PPO: Proximal Policy Optimization", url: "https://arxiv.org/abs/1707.06347", desc: "Schulman et al. (2017). Stable gradients.", year: 2017, author: "John Schulman" },
      { title: "Trust Region Policy Optimization", url: "https://arxiv.org/abs/1502.05477", desc: "Schulman et al. (2015). TRPO.", year: 2015, author: "John Schulman" },
      { title: "DDPG: Deep Deterministic", url: "https://arxiv.org/abs/1509.02971", desc: "Lillicrap et al. (2015). Continuous.", year: 2015, author: "Lillicrap et al." },
      { title: "Soft Actor-Critic", url: "https://arxiv.org/abs/1801.01290", desc: "Haarnoja et al. (2018). MaxEnt RL.", year: 2018, author: "Haarnoja et al." }
    ],
    transferPapers: [
      { title: "Transfer Learning Survey", url: "https://ieeexplore.ieee.org/document/5206848", desc: "Pan & Yang (2010). Comprehensive survey.", year: 2010, author: "Pan & Yang" },
      { title: "ImageNet Deep Features", url: "https://arxiv.org/abs/1403.6382", desc: "Donahue et al. (2014). CNN features.", year: 2014, author: "Donahue et al." },
      { title: "Fine-tuning CNNs", url: "https://arxiv.org/abs/1412.6856", desc: "Yosinski et al. (2014). Transferability.", year: 2014, author: "Yosinski et al." },
      { title: "Domain Adversarial Training", url: "https://jmlr.org/papers/v17/15-302.html", desc: "Ganin et al. (2016). Domain adaptation.", year: 2016, author: "Ganin et al." },
      { title: "DeCAF: Deep Convolutional Activation", url: "https://arxiv.org/abs/1310.1531", desc: "Donahue et al. (2013). Feature extraction.", year: 2013, author: "Donahue et al." },
      { title: "Progressive Neural Networks", url: "https://arxiv.org/abs/1606.04671", desc: "Rusu et al. (2016). Progressive transfer.", year: 2016, author: "Rusu et al." },
      { title: "LoRA: Low-Rank Adaptation", url: "https://arxiv.org/abs/2106.09685", desc: "Hu et al. (2021). Efficient fine-tuning.", year: 2021, author: "Edward Hu" },
      { title: "Prefix Tuning", url: "https://arxiv.org/abs/2101.00190", desc: "Li & Liang (2021). Prefix for generation.", year: 2021, author: "Li & Liang" },
      { title: "Prompt Tuning", url: "https://arxiv.org/abs/2104.08691", desc: "Sung et al. (2021). Just prompts.", year: 2021, author: "Sung et al." },
      { title: "AdapterFusion: Non-invasive Fine-tuning", url: "https://arxiv.org/abs/1802.08903", desc: "Rebuffi et al. (2018). Adapters.", year: 2018, author: "Rebuffi et al." }
    ],
    multimodalPapers: [
      { title: "CLIP: Learning Transferable Visual-Language", url: "https://arxiv.org/abs/2103.00020", desc: "Radford et al. (2021). Contrastive zero-shot.", year: 2021, author: "Alec Radford" },
      { title: "Flamingo: Visual Language Models", url: "https://arxiv.org/abs/2204.14198", desc: "Alayrac et al. (2022). Few-shot learning.", year: 2022, author: "Alayrac et al." },
      { title: "BLIP-2: Bootstrapping Language-Image", url: "https://arxiv.org/abs/2301.12597", desc: "Li et al. (2023). Pre-trained components.", year: 2023, author: "Junnan Li" },
      { title: "GPT-4V: Visual Understanding", url: "https://arxiv.org/abs/2303.08774", desc: "OpenAI (2023). Vision + language.", year: 2023, author: "OpenAI" },
      { title: "Kosmos-1: Language is All You Need", url: "https://arxiv.org/abs/2302.14045", desc: "Wei et al. (2023). Multimodal.", year: 2023, author: "Wei et al." },
      { title: "PaLM-E: Embodied Language Model", url: "https://arxiv.org/abs/2304.07198", desc: "Datta et al. (2023). Robotics.", year: 2023, author: "Datta et al." },
      { title: "SAM: Segment Anything Model", url: "https://arxiv.org/abs/2304.02643", desc: "Kirillov et al. (2023). Foundation segmentation.", year: 2023, author: "Kirillov et al." },
      { title: "LLaVA: Large Language & Vision", url: "https://arxiv.org/abs/2304.08485", desc: "Liu et al. (2023). Instruction tuning.", year: 2023, author: "Liu et al." },
      { title: "InstructBLIP: Visual Instruction Tuning", url: "https://arxiv.org/abs/2305.06500", desc: "Dai et al. (2023). Instruction following.", year: 2023, author: "Dai et al." },
      { title: "Video-LLM: Video Understanding", url: "https://arxiv.org/abs/2307.01021", desc: "Yang et al. (2023). Video + LLMs.", year: 2023, author: "Yang et al." }
    ],
    guides: [
      { title: "Rules of ML", url: "https://developers.google.com/machine-learning/guides/rules-of-ml", desc: "Google's ML engineering best practices.", type: "guide" },
      { title: "Deep Learning Tuning Playbook", url: "https://github.com/google-research/tuning_playbook", desc: "Scientific hyperparameter tuning.", type: "guide" },
      { title: "People + AI Guidebook", url: "https://pair.withgoogle.com/", desc: "Human-centered AI design.", type: "guide" },
      { title: "CS231n: Convolutional Neural Networks", url: "http://cs231n.stanford.edu/", desc: "Stanford's vision course.", type: "course" },
      { title: "CS224n: NLP with Deep Learning", url: "https://web.stanford.edu/class/cs224n/", desc: "Stanford's NLP course.", type: "course" },
      { title: "D2L: Dive into Deep Learning", url: "https://d2l.ai/", desc: "Interactive notebooks.", type: "book" }
    ]
  };

  const sections = [
    { key: 'foundation', papers: resources.foundationalPapers, section: "📚 Foundational Learning & Papers (1950s-1980s)" },
    { key: 'history', papers: resources.foundationalPapers, section: "📄 The History: How We Got Here (1950s-2020s)" },
    { key: 'neural', papers: resources.neuralNetworkPapers, section: "🧠 Neural Networks: Backpropagation (1980s-1990s)" },
    { key: 'cnn', papers: resources.cnnPapers, section: "👁️ Computer Vision: CNNs (1980s-Present)" },
    { key: 'sequence', papers: resources.sequencePapers, section: "🔄 Sequence Models: RNNs (1990s-2010s)" },
    { key: 'svm', papers: resources.svmPapers, section: "📊 SVMs & Kernels (1990s-2000s)" },
    { key: 'gan', papers: resources.ganPapers, section: "🎨 Generative Models: GANs (2014-2020)" },
    { key: 'diffusion', papers: resources.diffusionPapers, section: "🔮 Diffusion & VAE (2014-Present)" },
    { key: 'transformer', papers: resources.transformerPapers, section: "⚡ Transformers & Attention (2017-Present)" },
    { key: 'optimization', papers: resources.optimizationPapers, section: "🧮 Optimization (1960s-Present)" },
    { key: 'rl', papers: resources.rlPapers, section: "🎮 Reinforcement Learning (1980s-Present)" },
    { key: 'transfer', papers: resources.transferPapers, section: "🔄 Transfer Learning (2010s-Present)" },
    { key: 'multimodal', papers: resources.multimodalPapers, section: "🌈 Multimodal & Foundation Models (2021-Present)" }
  ];

  const renderLesson = (key) => {
    const lesson = lessons[key];
    if (!lesson) return null;
    return (
      <div className="lesson-overview">
        <h3 className="lesson-title">{lesson.title}</h3>
        <p className="lesson-text">{lesson.overview}</p>
        <div className="lesson-skills">
          <span className="skill-label">Skills you'll gain:</span>
          <div className="skills-tags">
            {lesson.skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
          </div>
        </div>
        <div className="lesson-learn">
          <span className="learn-label">What you'll learn:</span>
          <ul>
            {lesson.whatYouLearn.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <p className="lesson-next">{lesson.nextUp}</p>
      </div>
    );
  };

  const renderSection = (section, key) => (
    <section className="resource-section" id={key}>
      <h2>{section}</h2>
      <div className="lesson-cards">
        {renderLesson(key)}
      </div>
      <div className="papers-grid">
        {resources[key + 'Papers']?.map((paper, i) => (
          <a key={i} href={paper.url} target="_blank" rel="noopener noreferrer" className="paper-card">
            <div className="paper-year">{paper.year}</div>
            <h3>{paper.title}</h3>
            <p className="paper-author">{paper.author}</p>
            <p className="paper-desc">{paper.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );

  return (
    <div className="app-container">
      <main className="main-content">
        <header className="main-header">
          <div>
            <h1>ML <span>RESOURCES</span> with Lessons</h1>
            <p>150+ papers with lessons explaining how ML evolved — and where it's heading next</p>
          </div>
          <div className="header-actions">
            <Link to="/dashboard" className="btn-nav">Back to Dashboard</Link>
          </div>
        </header>

        <div className="resources-grid">
          <section className="resource-section">
            <h2>📚 Start Here: Foundational Learning</h2>
            <div className="cards-row">
              {resources.foundational.map((res, i) => (
                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="resource-card">
                  <span className={`tag ${res.type}`}>{res.type}</span>
                  <h3>{res.title}</h3>
                  <p>{res.desc}</p>
                  <span className="link-hint">Learn ↗</span>
                </a>
              ))}
            </div>
          </section>

          {renderSection("📄 Foundational Papers: The Beginning (1950s-1980s)", 'foundation')}
          {renderSection("📄 Neural Networks: Backpropagation Era (1980s-1990s)", 'neural')}
          {renderSection("👁️ Computer Vision: CNNs (1980s-Present)", 'cnn')}
          {renderSection("🔄 Sequence Models: RNNs, LSTMs (1990s-2010s)", 'sequence')}
          {renderSection("📊 SVMs & Kernels (1990s-2000s)", 'svm')}
          {renderSection("🎨 GANs (2014-2020)", 'gan')}
          {renderSection("🔮 Diffusion & VAE (2014-Present)", 'diffusion')}
          {renderSection("⚡ Transformers & Attention (2017-Present)", 'transformer')}
          {renderSection("🧮 Optimization (1960s-Present)", 'optimization')}
          {renderSection("🎮 Reinforcement Learning (1980s-Present)", 'rl')}
          {renderSection("🔄 Transfer Learning (2010s-Present)", 'transfer')}
          {renderSection("🌈 Multimodal & Foundation Models (2021-Present)", 'multimodal')}

          <section className="resource-section">
            <h2>⚙️ Architecture Guides & References</h2>
            <div className="cards-row">
              {resources.guides.map((res, i) => (
                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="resource-card">
                  <span className={`tag ${res.type}`}>{res.type}</span>
                  <h3>{res.title}</h3>
                  <p>{res.desc}</p>
                  <span className="link-hint">Explore ↗</span>
                </a>
              ))}
            </div>
          </section>
        </div>
        <Footer />
      </main>

      <style>{`
        .app-container {
            display: flex;
            min-height: 100vh;
            width: 100vw;
            background: radial-gradient(circle at top right, #1a1a2e, var(--bg-primary));
            overflow-y: auto;
        }
        .main-content {
            flex: 1;
            padding: 40px;
            display: flex;
            flex-direction: column;
            gap: 40px;
            max-width: 1400px;
            margin: 0 auto;
        }
        .main-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        h1 { font-size: 32px; margin: 0; letter-spacing: -1px; }
        h1 span { color: var(--accent-primary); }
        .header-actions { display: flex; gap: 15px; }
        .btn-nav {
            text-decoration: none;
            color: var(--text-secondary);
            padding: 8px 16px;
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            transition: all 0.2s;
            font-size: 14px;
        }
        .btn-nav:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
        .resources-grid { display: flex; flex-direction: column; gap: 50px; }
        .resource-section h2 {
            color: var(--text-primary);
            border-bottom: 1px solid var(--glass-border);
            padding-bottom: 10px;
            margin-bottom: 20px;
            font-size: 22px;
        }
        .cards-row {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        .papers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 15px;
        }
        .lesson-overview {
            background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(139, 92, 246, 0.1));
            border: 1px solid var(--accent-primary);
            border-radius: var(--radius-md);
            padding: 24px;
            margin-bottom: 24px;
        }
        .lesson-title {
            font-size: 20px;
            color: var(--accent-primary);
            margin: 0 0 12px 0;
        }
        .lesson-text {
            color: var(--text-secondary);
            font-size: 14px;
            line-height: 1.7;
            margin: 0 0 16px 0;
        }
        .lesson-learn { margin-bottom: 16px; }
        .learn-label {
            display: block;
            font-size: 12px;
            color: var(--accent-secondary);
            font-weight: 600;
            margin-bottom: 8px;
        }
        .lesson-learn ul {
            margin: 0;
            padding-left: 20px;
            color: var(--text-secondary);
            font-size: 13px;
        }
        .lesson-learn li { margin-bottom: 4px; }
        .lesson-next {
            background: rgba(52, 211, 153, 0.1);
            border-left: 3px solid #34d399;
            padding: 8px 12px;
            font-size: 13px;
            color: #34d399;
            font-style: italic;
            margin: 0;
        }
        .lesson-skills { margin-bottom: 16px; }
        .skill-label {
            display: block;
            font-size: 12px;
            color: var(--accent-secondary);
            font-weight: 600;
            margin-bottom: 8px;
        }
        .skills-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag {
            display: inline-block;
            padding: 4px 12px;
            background: rgba(96, 165, 250, 0.2);
            color: #60a5fa;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
        }
        .resource-card {
            background: var(--bg-panel);
            border: var(--glass-border);
            border-radius: var(--radius-md);
            padding: 20px;
            text-decoration: none;
            color: inherit;
            transition: transform 0.2s, box-shadow 0.2s;
            display: flex;
            flex-direction: column;
            height: 160px;
        }
        .resource-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--glass-shadow);
            border-color: var(--accent-primary);
        }
        .resource-card h3 {
            margin: 8px 0 6px 0;
            color: var(--accent-primary);
            font-size: 15px;
        }
        .resource-card p {
            margin: 0;
            color: var(--text-secondary);
            font-size: 13px;
            flex: 1;
        }
        .link-hint {
            font-size: 12px;
            color: var(--accent-secondary);
            font-weight: bold;
            align-self: flex-end;
        }
        .tag {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 600;
            width: fit-content;
        }
        .tag.course { background: #2563eb20; color: #60a5fa; }
        .tag.video { background: #dc262620; color: #fb7185; }
        .tag.book { background: #7c3aef20; color: #a78bfa; }
        .tag.guide { background: #05966820; color: #34d399; }
        .paper-card {
            background: var(--bg-panel);
            border: var(--glass-border);
            border-radius: var(--radius-md);
            padding: 16px;
            text-decoration: none;
            color: inherit;
            transition: all 0.2s;
            display: flex;
            flex-direction: column;
        }
        .paper-card:hover {
            transform: translateY(-2px);
            border-color: var(--accent-primary);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .paper-year { font-size: 11px; color: var(--accent-secondary); font-weight: 600; margin-bottom: 4px; }
        .paper-card h3 { margin: 0 0 4px 0; color: var(--text-primary); font-size: 14px; }
        .paper-author { font-size: 11px; color: var(--accent-primary); margin: 0 0 8px 0; }
        .paper-desc { font-size: 12px; color: var(--text-secondary); margin: 0; }
      `}</style>
    </div>
  );
}