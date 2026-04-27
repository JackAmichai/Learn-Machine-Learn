import re

def modify_file(path, replacements):
    with open(path, 'r') as f:
        content = f.read()
    for search, replace in replacements:
        content = content.replace(search, replace)
    with open(path, 'w') as f:
        f.write(content)

modify_file('src/components/LandingHeroVisuals.jsx', [
    ('const Tile = ', 'const _Tile = ')
])

modify_file('src/components/MathModal.jsx', [
    ('import { getNotebookLMLink } from "../engine/personalizationEngine";', '')
])

modify_file('src/components/math/EmbeddingVisualizer.jsx', [
    ('const [vectors, setVectors] = useState', 'const [vectors] = useState'),
    ('const analogies = [', 'const _analogies = [')
])

modify_file('src/components/math/ActivationVisualizer.jsx', [
    ('if (values.x !== undefined) setX(values.x);', 'if (values.x !== undefined) setTimeout(() => setX(values.x), 0);'),
    ('if (values.input !== undefined) setX(values.input);', 'if (values.input !== undefined) setTimeout(() => setX(values.input), 0);')
])

modify_file('src/components/math/LossVisualizer.jsx', [
    ('setPredicted(actual - values.err);', 'setTimeout(() => setPredicted(actual - values.err), 0);'),
    ('if (values.predicted !== undefined) setPredicted(values.predicted);', 'if (values.predicted !== undefined) setTimeout(() => setPredicted(values.predicted), 0);'),
    ('if (values.yhat !== undefined) setPredicted(values.yhat);', 'if (values.yhat !== undefined) setTimeout(() => setPredicted(values.yhat), 0);')
])

modify_file('src/components/math/NeuralNetworkVisualizer.jsx', [
    ('setLayers([layers[0], values.nodes, layers[2]]);', 'setTimeout(() => setLayers([layers[0], values.nodes, layers[2]]), 0);'),
    ('setLayers([layers[0], values.hiddenNodes, layers[2]]);', 'setTimeout(() => setLayers([layers[0], values.hiddenNodes, layers[2]]), 0);'),
    ('}, [values.nodes, values.hiddenNodes]);', '}, [values.nodes, values.hiddenNodes, layers]);')
])

modify_file('src/components/math/PCAVisualizer.jsx', [
    ('if (values.lambda1 !== undefined) setComponent1(values.lambda1);', 'if (values.lambda1 !== undefined) setTimeout(() => setComponent1(values.lambda1), 0);'),
    ('if (values.lambda2 !== undefined) setComponent2(values.lambda2);', 'if (values.lambda2 !== undefined) setTimeout(() => setComponent2(values.lambda2), 0);'),
    ('if (values.lambda3 !== undefined) setComponent3(values.lambda3);', 'if (values.lambda3 !== undefined) setTimeout(() => setComponent3(values.lambda3), 0);')
])

modify_file('src/components/math/TensorVisualizer.jsx', [
    ('const p000 = ', 'const _p000 = ')
])

modify_file('src/contexts/ProgressContext.jsx', [
    ('setState(prev => {', 'setTimeout(() => setState(prev => {'),
    ('            return { ...prev, lastActiveDate: today, streakDays: nextStreak };\n        });', '            return { ...prev, lastActiveDate: today, streakDays: nextStreak };\n        }), 0);'),
    ('            return evaluateAchievements(next);\n        });\n    }, [evaluateAchievements]);', '            return evaluateAchievements(next);\n        }), 0);\n    }, [evaluateAchievements]);'),
    ('            return evaluateAchievements(next);\n        });\n    }, [evaluateAchievements]);', '            return evaluateAchievements(next);\n        }), 0);\n    }, [evaluateAchievements]);') # second occurrence
])
