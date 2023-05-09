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
    constraint ComCours_pk
        primary key (idCompletedCourses),
    constraint fk_user2
        foreign key (idUser) references `users` (idUser),
    constraint fk_courses
        foreign key (idCourse) references `courses` (id_course)
);
create table `tests`
(
    idtest     int auto_increment,
    name        VARCHAR(45)  not null,
    description       VARCHAR(45) null,
    id_course       int not null,
    state VARCHAR(10) not NULL,
    constraint test_pk
        primary key (idtest),
    constraint fk_course
        foreign key (id_course) references `courses` (id_course)
);
create table `questionForTest`
(
    idquestion     int auto_increment,
    question        VARCHAR(45)  not null,
    answer      VARCHAR(45) not null,
    otherQuestionAnswer      VARCHAR(100) null,
    test_id       int not null,
    constraint question_pk
        primary key (idquestion),
    constraint fk_test
        foreign key (test_id) references `tests` (idtest)
);
create table `rule`
(
    idrule     int auto_increment,
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
    link        LONGTEXT  not null,
    description VARCHAR(100) null,
    test_id      int not null,
    constraint video_pk
        primary key (idvideo),
    constraint fk_test3
        foreign key (test_id) references `tests` (idtest)
);