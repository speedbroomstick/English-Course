create table `group`
(
    idGroup     int auto_increment,
    name        VARCHAR(45)  not null,
    photo       VARCHAR(100) null,
    description VARCHAR(45)  null,
    constraint group_pk
        primary key (idGroup)
);

create table `words`
(
    idWords     int auto_increment,
    word        VARCHAR(100)  not null,
    translation       VARCHAR(100) null,
    means       VARCHAR(100) null,
    example VARCHAR(200)  null,
    idGroup int not null,
    constraint words_pk
        primary key (idWords),
    constraint fk_group
        foreign key (idGroup) references `group` (idGroup)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
create table `achievemetnts`
(
    idAchievemetnts     int auto_increment,
    name        VARCHAR(45)  not null,
    `condition`       VARCHAR(45) not null,
    `count`       INT not null,
    constraint achievemetnts_pk
        primary key (idAchievemetnts)
);
create table `users`
(
    idUser     int auto_increment,
    login        VARCHAR(45)  not null,
    password       VARCHAR(45) not null,
    constraint users_pk
        primary key (idUser)
);
create table `CompletedAchievements`
(
    idCompletedAchievements     int auto_increment,
    idUser        INT  not null,
    idAchievements       INT not null,
    constraint ComAch_pk
        primary key (idCompletedAchievements),
    constraint fk_user
        foreign key (idUser) references `users` (idUser),
    constraint fk_achievement
        foreign key (idAchievements) references `achievemetnts` (idAchievemetnts)
);
create table `courses`
(
    id_course     int auto_increment,
    name        VARCHAR(65)  not null,
    description       VARCHAR(65) null,
    level       INT not null,
    photo       VARCHAR(500) null, 
    constraint achievemetnts_pk
        primary key (id_course)
);
create table `CompletedCourses`
(
    idCompletedCourses     int auto_increment,
    idUser        INT  not null,
    idCourse       INT not null,
    procent INT not null,
    constraint ComCours_pk
        primary key (idCompletedCourses),
    constraint fk_user2
        foreign key (idUser) references `users` (idUser),
    constraint fk_courses
        foreign key (idCourse) references `courses` (id_course)
);
CREATE TABLE tests (
    idtest INT AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    description VARCHAR(65) NULL,
    id_course INT NOT NULL,
    PRIMARY KEY (idtest),
    CONSTRAINT fk_course
        FOREIGN KEY (id_course) REFERENCES courses (id_course)
        ON DELETE CASCADE,
    CONSTRAINT fk_course_update
        FOREIGN KEY (id_course) REFERENCES courses (id_course)
        ON UPDATE CASCADE
);
create table `questionForTest`
(
    idquestion     int auto_increment,
    question        VARCHAR(45)  not null,
    answer      VARCHAR(100) not null,
    type_oi VARCHAR(45) not null,
    type_i VARCHAR(45) not null,
    otherQuestionAnswer      VARCHAR(100) null,
    test_id       int not null,
    PRIMARY KEY (idquestion),
    CONSTRAINT fk_question
        FOREIGN KEY (test_id) REFERENCES `tests` (idtest)
        ON DELETE CASCADE,
    CONSTRAINT fk_question_update
        FOREIGN KEY (test_id) REFERENCES `tests` (idtest)
        ON UPDATE CASCADE
);
create table `rule`
(
    idrule     int auto_increment,
    name         VARCHAR(45)  not null,
    title          VARCHAR(450)  not null,
    ruleText        LONGTEXT  not null,
    test_id      int not null,
    constraint rule_pk
        primary key (idrule),
    constraint fk_test2
        foreign key (test_id) references `tests` (idtest)
);

create table `video`
(
    idvideo     int auto_increment,
    link        VARCHAR(150)  not null,
    description VARCHAR(100) null,
    test_id      int not null,
    PRIMARY KEY (idvideo),
    CONSTRAINT fk_video
        FOREIGN KEY (test_id) REFERENCES `tests` (idtest)
        ON DELETE CASCADE,
    CONSTRAINT fk_video_update
        FOREIGN KEY (test_id) REFERENCES `tests` (idtest)
        ON UPDATE CASCADE
);
-- Настройка каскадного удаления

ALTER TABLE CompletedCourses
ADD CONSTRAINT fk_course4
FOREIGN KEY (idCourse)
REFERENCES courses (id_course)
ON DELETE CASCADE;

-- Настройка каскадного обновления
ALTER TABLE CompletedCourses
ADD CONSTRAINT fk_course5
FOREIGN KEY (idCourse)
REFERENCES courses (id_course)
ON UPDATE CASCADE;