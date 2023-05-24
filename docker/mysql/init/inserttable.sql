SET NAMES 'utf8mb4';
INSERT INTO users (login,password) VALUES ('LeonidGovorec','LeonidGovorec'),('AdminPanelQ','AdminPanelQ');
INSERT INTO `group` (name,photo,description) VALUES ('Oxford3000-A1','gs://english-course-18e54.appspot.com/A1.png','Слова уровня А1'),
                                                    ('MyPersonalWords','gs://english-course-18e54.appspot.com/myPersonal.jpg','Моя персональная подборка');
INSERT INTO `courses` (name,description,level,photo) VALUES ('English Conversation Course','Прокачает ваш разговорный',2,'photo/big-ben.jpg');
                                                            -- ('Grammar Basics','Времена, предлоги, неправильные глаголы',3,'photo/gramar.jpg'),
                                                            -- ('Learn to write','Пишите и тренеруйте навыки написания',2,'photo/english.jpg');
INSERT INTO `tests` (name,id_course,description) VALUES ('Проверим твое произношение',1,'Просто произносите, что видете'),
                                                        ('Посмотрим твое восприятие',1,'Произносите, что услышите на видео');
INSERT INTO `CompletedCourses` (idUser,idCourse,procent) VALUES (1,1,0);

INSERT INTO `video` (link,description,test_id) VALUES ('wednesday/Wednesday1.mp4','',1),
                                                      ('wednesday/Wednesday2.mp4','',2),
                                                      ('wednesday/Wedneday3.mp4','',1),
                                                      ('wednesday/Wednesday7.mp4','',2),
                                                      ('wednesday/Wednesday8.mp4','',2);

INSERT INTO `questionForTest` (question,answer,type_i,type_oi,test_id) VALUES ('window','window','audio','text',1),
                                                                      ('black','black','audio','text',1),
                                                                      ('1','Let him go. You want to end up in the stocks too?','audio','video',1),
                                                                      ('picture','picture','audio','text',1),
                                                                      ('3',"We're all set. Good. Thing's in position.",'audio','video',1),
                                                                      ('2','Remember what happened the last time we did this dance?','audio','video',2),
                                                                      ('cat','cat','audio','text',2),
                                                                      ('dog','dog','audio','text',2),
                                                                      ('4',"your costume's in the tent. Costume?",'audio','video',2),
                                                                      ('5','OMG, you look perfect!','audio','video',2);

INSERT INTO words (word,translation,example,idGroup) VALUES ('about','о, около, приблизительно','What are tou talking about?(О чем ты говоришь?)',1),
                                                            ('above','над, выше, вышеуказанное','You-re not above the law(Ты не выше закона)',1),
                                                            ('across','через, поперек, сквозь','We deove across the city(Мы ехали через город)',1),
                                                            ('action','действие','We need action, not words(Нам нужны действия, а не слова)',1),
                                                            ('to add','добавлять, прибавлять, складывать','I have nothing to add(Мне нечего добавить)',1),
                                                            ('peel','чистить, очищать','I really so much wanna peel yout face now!(Я правда так сильно хочу очистить твое лицо!)',2),
                                                            ('smirk','ухмыляться',"If you don't stop smirk in forward me, you will fell a pain(Если ты не прекратишь ухмыляться в мою сторону, ты почувтсвуешь боль)",2),
                                                            ('nefarious','гнусный','You have the nefarious look(У тебя гнусный вид)',2),
                                                            ('participate','учавствовать','You participated in crul game(Ты учавствовала в жестокой игре)',2),
                                                            ('disdain','подозрения','When you have taken this disdain(Когда ты начала подозревать?)',2),
                                                            ('dorm','общежитие','Which one of you dorm?(Какое твое общежитие?)',2),
                                                            ('smother','душить,тушить, подавлять','Why are you smothering your sex orientation??(Почему ты подавил свою сексуальную ориентацию?)',2),
                                                            ('tad','немного, слегка','You realy tad get out of ypur mind(Ты и в правду немного сходишьс ума)',2),
                                                            ('whine','ныть','While you whine our classmaters will win over and over(Пока ты ноешь наши одноклассники будут выигрывать снова и снова)',2),
                                                            ('compettion','соревнование, конкуренция','When this compettion will be over?(Когда эта конкуренуия закончится?)',2),
                                                            ('remorse','раскаяние','I wish you will give some remorse that man(Я желаю тебе дать этому аврню немного твоего раскаяние)',2),
                                                            ('casket','гроб','Where is you casket?(Где твой гроб?)',2),
                                                            ('freebie','халява','Where freebie?(Где халява?)',2),
                                                            ('tricky','сложный, хитрый',"You're major trait is tricky(Твоя главная особенность это хитрость)",2),
                                                            ('trait','характерная черта, особенность','What is your major trait?(Какая твоя главная характерная черта)',2),
                                                            ('enigma','загадка, энигма','How much i will save keeping, enogh enigma for my mind(Сколько я буду терпеть достаточная загадка для моего разума)',2);
