SET NAMES 'utf8mb4';
INSERT INTO users (login,password) VALUES ('LeonidGovorec','LeonidGovorec'),('AdminPanelQ','AdminPanelQ');
INSERT INTO `group` (name,photo,description) VALUES ('Oxford3000-A1','gs://english-course-18e54.appspot.com/A1.png','Слова уровня А1'),
                                                    ('Wednesday','photo/wednesday.jpg','Слова из сериала «Wednesday»'),
                                                    ('MyPersonalWords','gs://english-course-18e54.appspot.com/myPersonal.jpg','Моя персональная подборка');
INSERT INTO `courses` (name,description,level,photo) VALUES ('English Conversation Course','Прокачает ваш разговорный',2,'photo/big-ben.jpg'),
                                                            ('Grammar Basics','Времена, предлоги, неправильные глаголы',3,'photo/gramar.jpg');
                                                            -- ('Learn to write','Пишите и тренеруйте навыки написания',2,'photo/english.jpg');
INSERT INTO `tests` (name,id_course,description) VALUES ('Проверим твое произношение',1,'Просто произносите, что видете'),
                                                        ('Посмотрим твое восприятие',1,'Произносите, что услышите на видео'),
                                                        ('Правило',2,'Прочитайте');
                                                        
INSERT INTO `rule` (name,ruleText,test_id) VALUES ('Неправильные глаголы','Проверим твое произношениеПроверим твое произношениеПроверим твое произношениеПроверим твое произношениеПроверим твое произношение',3);
INSERT INTO `CompletedCourses` (idUser,idCourse,procent) VALUES (1,1,0), (1,2,0);

INSERT INTO `video` (link,description,test_id) VALUES ('wednesday/Wednesday1.mp4','',1),
                                                      ('wednesday/Wednesday2.mp4','',2),
                                                      ('wednesday/Wedneday3.mp4','',1),
                                                      ('wednesday/Wednesday7.mp4','',2),
                                                      ('wednesday/Wednesday8.mp4','',2);

INSERT INTO `questionForTest` (question,answer,type_i,type_oi,test_id) VALUES ('Неправильные глаголы','','rule','rule',3),
                                                                    ('window','window','audio','text',1),
                                                                      ('black','black','audio','text',1),
                                                                      ('1','Let him go. You want to end up in the stocks too?','audio','video',1),
                                                                      ('picture','picture','audio','text',1),
                                                                      ('3',"We're all set. Good. Thing's in position.",'audio','video',1),
                                                                      ('2','Remember what happened the last time we did this dance?','audio','video',2),
                                                                      ('cat','cat','audio','text',2),
                                                                      ('dog','dog','audio','text',2),
                                                                      ('4',"your costume's in the tent. Costume?",'audio','video',2),
                                                                      ('5','OMG, you look perfect!','audio','video',2);

INSERT INTO words (word, translation, example, idGroup) VALUES
('about', 'о, около, приблизительно', 'What are you talking about? (О чем ты говоришь?)', 1),
('above', 'над, выше, вышеуказанное', "You're not above the law (Ты не выше закона)", 1),
('across', 'через, поперек, сквозь', 'We drove across the city (Мы ехали через город)', 1),
('action', 'действие', 'We need action, not words (Нам нужны действия, а не слова)', 1),
('to add', 'добавлять, прибавлять, складывать', 'I have nothing to add (Мне нечего добавить)', 1),
('PTSD', 'Постравматическое стрессовое расстройство', "But there's another way of thinking about PTSD (Но можно думать о постравматическом стрессовом расстройстве по-другому)", 2),
('clue', 'Зацепка, раскрыть тайну', "You gotta find the clues that he left for us, Amelia (Ты должна найти улики, которые он для нас оставил)", 2),
('terrify', 'Ужасать', 'Just an extraordinary, terrifying scene (Просто чрезвычайно ужасающий вид)', 2),
('autopsy', 'Вскрытие, аутопсия', "I've completed my autopsy on your bomber (Я закончила вскрытие вашего подрывника)", 2),
('pout', 'Надуваться, дуть губы', "What, now you're gonna pout? (Что дуешься теперь?)", 2),
('slice', 'рассекать, резать', 'You slice the green beans (Ты нарезай зеленую фасоль)', 2),
('surgical', 'хирургический', 'Down here I am a surgical nurse (Здесь, внизу, я операционная медсестра)', 2),
('pattern', 'шаблон, модель, картина', 'Merton discovered a strong pattern (Мертон обнаружил ярко выраженную закономерность)', 2),
('glum', 'угрюмый, хмурый, мрачный', 'From here on in it will be angry glances and accusatory stares, suspicious neighbors and glum shop workers', 2),
('display', 'демонстрация(глагол)', 'Display your streaming media apps (Показать приложения потоковой передачи)', 2),
('wipe', 'вытирать', 'Wipe device after failed (attempts) (Очистка устройства после неудачных попыток)', 2),
('sin', 'грех, порок, проступок', "My father's a priest so I need to sin (Мой отец священник, так что, я рожден, чтобы грешить)", 2),
('hang', 'висеть, вешать, подвешивать', 'They should hang the bastard (Повесить бы подлеца)', 2),
('extent', 'Степень, меры, пределы', 'The strategy worked, to some extent (В какой-то степени, эта стратегия работала)', 2),
('furious', 'яростный, неистовый', 'Behind me, a Kuwaiti diplomat scribbled furious notes in Arabic', 2),
('disaster', 'катастрофа, бедствие', "Haiti's disaster of engineering (Инженерное бедствие Гаити)", 2),
('sensation', 'ощущение', 'It was a strange sensation', 2),
('sour', 'кислый, сернистый', 'Sour milk and baking soda', 2),
('hook up', 'целоваться', 'Maybe soon we can hook up', 2),
('awkward', 'неловко', 'Being here feels awkward, considering (Здесь, это как-то неловко, принужденно)', 2),
('temporary', 'временный', 'To relocate the temporary folder (Чтобы переместить временную папку)', 2),
('assess', 'оценивать', 'While we assess our situation', 2),
('creepy', 'жуткий', 'Creepy prison nursery with observation deck (Жуткая тюремная детская с наблюдательным постом)', 2),
('cannon', 'пушка', 'This will change battlefield dynamics by increasing the importance of cannon, anti-tank guns, and tanks', 2),
('dismiss', 'гнать от себя, игнорировать', "I'm denying your motion to dismiss (Я отклоняю ваше ходатайство о закрытии дела)", 2),
('peel', 'чистить, очищать', 'I really want to peel your face now (Я правда так сильно хочу очистить твое лицо)', 3),
('smirk', 'ухмыляться', "If you don't stop smirking at me, you will feel pain (Если ты не прекратишь ухмыляться в мою сторону, ты почувствуешь боль)", 3),
('nefarious', 'гнусный', 'You have a nefarious look (У тебя гнусный вид)', 3),
('participate', 'участвовать', 'You participated in a cruel game (Ты участвовала в жестокой игре)', 3),
('disdain', 'подозрения', 'When did you start having this disdain? (Когда ты начала подозревать?)', 3),
('dorm', 'общежитие', 'Which one of your dorms? (Какое твое общежитие?)', 3),
('smother', 'душить, тушить, подавлять', 'Why are you smothering your sexual orientation? (Почему ты подавил свою сексуальную ориентацию?)', 3),
('tad', 'немного, слегка', 'You really tad get out of your mind (Ты и в правду немного сходишь с ума)', 3),
('whine', 'ныть', 'While you whine, our classmates will win over and over (Пока ты ноешь, наши одноклассники будут выигрывать снова и снова)', 3),
('competition', 'соревнование, конкуренция', 'When will this competition be over? (Когда эта конкуренция закончится?)', 3),
('remorse', 'раскаяние', 'I wish you will give some remorse to that man (Я желаю тебе дать этому аваню немного твоего раскаяния)', 3),
('casket', 'гроб', 'Where is your casket? (Где твой гроб?)', 3),
('freebie', 'халява', 'Where is the freebie? (Где халява?)', 3),
('tricky', 'сложный, хитрый', "Your major trait is tricky (Твоя главная особенность это хитрость)", 3),
('trait', 'характерная черта, особенность', 'What is your major trait? (Какая твоя главная характерная черта?)', 3),
('enigma', 'загадка, энигма', 'How much will I save keeping enough enigma for my mind? (Сколько я буду терпеть, достаточная загадка для моего разума?)', 3);

