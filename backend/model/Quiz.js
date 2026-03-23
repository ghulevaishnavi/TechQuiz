import mongoose from "mongoose";

// question schema
const questionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: v => 
                v.length === 4 && v.every(opt => opt && opt.trim()),
            message: "Each question must contain 4 valid options"
        }
    },
    answerKey: {
        type: String,
        enum: ["A", "B", "C", "D"],
        required: true
    }
});

// main quiz schema
const quizSchema = new mongoose.Schema({
    technology: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    level: {
        type: String,
        enum: ["Basic", "Intermediate", "Advanced"],
        required: true
    },
    timelimit: {
        type: Number,
        required: true,
        min: 1
    },
    questions: {
        type: [questionsSchema],
        required: true
    },
    totalQuestions: Number,
    createdBy: {
        type: String,
        required: true
    }
}, { timestamps: true });

quizSchema.index({technology: 1, level: 1}, {unique: true});
export default mongoose.model("Quiz", quizSchema);