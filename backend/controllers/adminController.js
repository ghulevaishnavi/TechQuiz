import Quiz from "../model/Quiz.js";

const LETTERS = ["A", "B", "C", "D"];

// to create a quiz from CSV file
export const uploadQuiz = async (req, res) => {
    try {
        const { technology, level, timeLimit, questions } = req.body;
        const createdBy = req.auth?.userId;

        const quiz = await Quiz.findOneAndUpdate(
            { technology, level },
            {
                technology,
                level,
                timelimit: timeLimit,
                questions,
                totalQuestions: questions.length,
                createdBy
            },
            {
                new: true,
                upsert: true
            }
        );

        res.json({ success: true, quiz });
    } catch (err) {
        console.log("UPLOAD ERROR:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// to get all quiz stats
export const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().sort({ createdAt: -1 });
        res.json(quizzes);
    } catch (err) {
        console.log("GET ALL QUIZZES ERROR:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// to delete a quiz
export const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findByIdAndDelete(id);

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.json({ success: true, message: "Quiz deleted successfully!" });

    } catch (error) {
        console.error("DELETE QUIZ ERROR:", error);
        res.status(500).json({
            message: "Server Error"
        });
    }
}