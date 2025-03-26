-- Users table
CREATE TABLE Users (
    _id VARCHAR(24) PRIMARY KEY,
    name VARCHAR(150),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    status ENUM('active', 'pending', 'block') DEFAULT 'pending',
    date_of_birth DATE,
    sex INT,
    avatar VARCHAR(255) DEFAULT '',
    roles VARCHAR(50) NOT NULL DEFAULT 'student',
    phone VARCHAR(20) DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE Courses (
    _id VARCHAR(24) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    level ENUM('N5', 'N4', 'N3', 'N2', 'N1'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Lessons table
CREATE TABLE Lessons (
    _id VARCHAR(24) PRIMARY KEY,
    course_id VARCHAR(24),
    lesson_id VARCHAR(50) UNIQUE NOT NULL,
    lesson_title VARCHAR(255) NOT NULL,
    video_url VARCHAR(255) DEFAULT '',
    description TEXT DEFAULT '',
    status ENUM('draft', 'published') DEFAULT 'draft',
    index INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES Courses(_id)
);

-- Vocabulary table
CREATE TABLE Vocabulary (
    _id VARCHAR(24) PRIMARY KEY,
    lesson_id VARCHAR(24),
    word VARCHAR(255) NOT NULL,
    kanji VARCHAR(255),
    kana VARCHAR(255) NOT NULL,
    meaning TEXT NOT NULL,
    audio VARCHAR(255),
    example TEXT,
    tags VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(_id)
);

-- Kanji table
CREATE TABLE Kanji (
    _id VARCHAR(24) PRIMARY KEY,
    kanji VARCHAR(10),
    cn_vi_word VARCHAR(255),
    explain TEXT,
    jlpt VARCHAR(10),
    mean TEXT,
    stroke_num INT,
    svg_path TEXT,
    unicode VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Grammar table
CREATE TABLE Grammar (
    _id VARCHAR(24) PRIMARY KEY,
    lesson_id VARCHAR(24),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(_id)
);

-- Decks table
CREATE TABLE Decks (
    _id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    deck_title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(_id)
);

-- Flashcards table
CREATE TABLE Flashcards (
    _id VARCHAR(24) PRIMARY KEY,
    grammar_id VARCHAR(24),
    vocab_id VARCHAR(24),
    kanji_id VARCHAR(24),
    deck_id VARCHAR(24) NOT NULL,
    front TEXT,
    back TEXT,
    review_date DATETIME,
    interval INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (grammar_id) REFERENCES Grammar(_id),
    FOREIGN KEY (vocab_id) REFERENCES Vocabulary(_id),
    FOREIGN KEY (kanji_id) REFERENCES Kanji(_id),
    FOREIGN KEY (deck_id) REFERENCES Decks(_id)
);

-- Exams table
CREATE TABLE Exams (
    _id VARCHAR(24) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    time_limit INT NOT NULL,
    total_points INT NOT NULL,
    level ENUM('N5', 'N4', 'N3', 'N2', 'N1') NOT NULL,
    creator_id VARCHAR(24),
    is_published BOOLEAN DEFAULT FALSE,
    allowed_time INT,
    passing_score INT,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced'),
    visibility ENUM('public', 'private', 'group') DEFAULT 'public',
    allowed_attempts INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES Users(_id)
);

-- Exam Questions table
CREATE TABLE ExamQuestions (
    _id VARCHAR(24) PRIMARY KEY,
    exam_id VARCHAR(24) NOT NULL,
    question_id VARCHAR(50) NOT NULL,
    type ENUM('multiple_choice', 'fill_in', 'ordering', 'listening', 'reading') NOT NULL,
    content TEXT NOT NULL,
    instruction TEXT,
    media_url VARCHAR(255),
    reading_passage TEXT,
    correct_answer VARCHAR(255) NOT NULL,
    point INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (exam_id) REFERENCES Exams(_id)
);

-- Exam Question Options table
CREATE TABLE ExamQuestionOptions (
    _id VARCHAR(24) PRIMARY KEY,
    question_id VARCHAR(24) NOT NULL,
    text TEXT NOT NULL,
    option_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES ExamQuestions(_id)
);

-- Results table
CREATE TABLE Results (
    _id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    exam_id VARCHAR(24) NOT NULL,
    start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_time DATETIME,
    total_score INT DEFAULT 0,
    status ENUM('in-progress', 'completed', 'abandoned') DEFAULT 'in-progress',
    time_spent INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(_id),
    FOREIGN KEY (exam_id) REFERENCES Exams(_id)
);

-- Result Answers table
CREATE TABLE ResultAnswers (
    _id VARCHAR(24) PRIMARY KEY,
    result_id VARCHAR(24) NOT NULL,
    question_id VARCHAR(50) NOT NULL,
    user_answer VARCHAR(255) NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (result_id) REFERENCES Results(_id)
);

-- Enrollments table
CREATE TABLE Enrollments (
    _id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24) NOT NULL,
    course_id VARCHAR(24) NOT NULL,
    enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(_id),
    FOREIGN KEY (course_id) REFERENCES Courses(_id),
    UNIQUE KEY unique_enrollment (user_id, course_id)
);

-- Progressions table
CREATE TABLE Progressions (
    _id VARCHAR(24) PRIMARY KEY,
    user_id VARCHAR(24),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(_id)
);

-- Progression Details table
CREATE TABLE ProgressionDetails (
    _id VARCHAR(24) PRIMARY KEY,
    progression_id VARCHAR(24) NOT NULL,
    course_id VARCHAR(24),
    lesson_type ENUM('Lesson', 'Hina'),
    lesson_id VARCHAR(24),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (progression_id) REFERENCES Progressions(_id),
    FOREIGN KEY (course_id) REFERENCES Courses(_id)
);

-- Exam Progress table
CREATE TABLE ExamProgress (
    _id VARCHAR(24) PRIMARY KEY,
    progression_id VARCHAR(24) NOT NULL,
    exam_id VARCHAR(24),
    point INT,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (progression_id) REFERENCES Progressions(_id),
    FOREIGN KEY (exam_id) REFERENCES Exams(_id)
);

-- Notifications table
CREATE TABLE Notifications (
    _id VARCHAR(24) PRIMARY KEY,
    noti_type ENUM('EXAM-001', 'EXAM-002', 'COURSE-001') NOT NULL,
    noti_sender_id VARCHAR(24) NOT NULL,
    noti_received_id VARCHAR(24) NOT NULL,
    noti_content TEXT NOT NULL,
    noti_options JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (noti_sender_id) REFERENCES Users(_id),
    FOREIGN KEY (noti_received_id) REFERENCES Users(_id)
);

-- Renshuu table
CREATE TABLE Renshuu (
    _id VARCHAR(24) PRIMARY KEY,
    title VARCHAR(255),
    lesson_id VARCHAR(24),
    total_points INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(_id)
);

-- Renshuu Contents table
CREATE TABLE RenshuuContents (
    _id VARCHAR(24) PRIMARY KEY,
    renshuu_id VARCHAR(24) NOT NULL,
    content_text TEXT NOT NULL,
    point INT NOT NULL,
    value VARCHAR(255) NOT NULL,
    url_audio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (renshuu_id) REFERENCES Renshuu(_id)
);

-- Renshuu Quizzes table
CREATE TABLE RenshuuQuizzes (
    _id VARCHAR(24) PRIMARY KEY,
    content_id VARCHAR(24) NOT NULL,
    quiz_data JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (content_id) REFERENCES RenshuuContents(_id)
);


