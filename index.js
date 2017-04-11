const discord = require('discord.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
var fs = require('fs'),
    readline = require('readline');

/*
invite link: https://discordapp.com/oauth2/authorize?client_id=277958138873774082&scope=bot&permissions=1544027263
date rindesk left: 2/10/2017
*/

//start-up message
var auto = false;
var autoMess = "turtles";

//emotes
    var emotes = {
        kotoxd: 'https://s19.postimg.org/m1i7q6czn/koto_XD.png',
        kotoglasses: 'https://s19.postimg.org/aetibb0ar/kotoglasses.png',
        kotodisgust: 'https://s19.postimg.org/wzovumc77/kotodisgust.png',
        kotowave: 'https://s19.postimg.org/86jx7pikj/kotowave.png',
        kotobombing: 'https://s19.postimg.org/qw2pwywjn/kotobombing.gif',
        kotogood: 'https://s19.postimg.org/5hfxq6ybn/kotogood.png',
        kotoegg: 'https://s19.postimg.org/fc72wf29v/kotoegg.png',
        kotosquare: 'https://s19.postimg.org/3tgsbjkg3/kotosquare.png',
        kotostares: 'https://s19.postimg.org/zegrf1sg3/kotostares.png',
        kotooh: 'https://s19.postimg.org/cn7osn7er/kotooo.png',
        kotodying: 'https://s19.postimg.org/u6voalbur/kotodying.png',
        kotolock: 'https://s19.postimg.org/c96ct1nb7/kotolock.png',
        kototired: 'https://s19.postimg.org/xb6c7dsn7/kototired.png',
        kotodelete: 'https://s19.postimg.org/v6hdsk1mr/kotodelete.png',
        itsabirb: 'https://s19.postimg.org/4m9mz2i4j/itsabirb.png',
        kotogun: 'https://s19.postimg.org/r0rbfakw3/kotogun.png',
        kotodoritos: 'https://s19.postimg.org/6s3xtklkz/kotodoritos.png',
        kotomad: 'https://s19.postimg.org/6untgep8j/kotomad.gif',
        kotosleepy: 'https://s19.postimg.org/d9mud2vyb/kotosleepy.png',
        kotoknife: 'https://s19.postimg.org/8bav2fw3n/kotoknife.png',
        kototriggered: 'https://s19.postimg.org/vi6oy7uir/kototriggered.gif',
        kotoclaw: 'https://s19.postimg.org/8zxje5bgj/kotoclaw.png',
        turtlebomb: 'https://s19.postimg.org/ifwso59vn/turtlebomb.png',
        turtlesock: 'https://s19.postimg.org/6s2qtlkqr/turtlesock.png',
        kotolove: 'https://s19.postimg.org/4f88io66b/kotolove.png'
    }
    var serverEmotes = [
     '<:valenkoto:243687168801767424>', '<:usagitori:243687124765769738>', '<:thankoto:243687150258880512>', '<:spooktori:244500321500397570>',
     '<:snowbirb:275381334392832000>', '<:rudolphtori:243687109351833601>', '<:NotLikeBirb:273585046613524480>', '<:KotoYou:273598214647709707>',
     '<:kotowut:265657184799424513>', '<:KotoWow:272834701998424065>', '<:kotowoah:274066505589850122>', '<:kotowink:247560607929335808>',
     '<:kotoween:247559215969861632>', '<:kotoWave:277952614774210560>', '<:kotowaifu:247563118056570883>', '<:kotospooked:247557168545529856>',
        '<:kotoSmug:268069343756156928>', '<:kotoSlep:274281746407751680>', '<:KotoSleep:273955032775393281>', '<:KotoScared:273961113903824896>',
        '<:KotoroThonk:273174542858452992>', '<:kotorikawaii:247557166485995521>', '<:KotoriHeart:274967757932462080>', '<:kotoparty:243687025352376330>',
        '<:Kotooo:273943108792614914>', '<:KotoOK:272847067456602113>', '<:kotonyan:247552119022813184>', '<:kotoLewd:274276190074699777>',
        '<:KotoHi:276448349656317953>', '<:KotoHappy:261983901990256651>', '<:KotoGoro:272839038019436544>', '<:kotoehehe:247552108037931008>',
            '<:kotodere:273971991403560961>', '<:KotoCute:273928467802882048>', '<:KotoCry:273273885619781642>', '<:kotochild:274069317207851008>',
            '<:kotoborb:262118494517067776>', '<:kotobomb2:247565238772301824>', '<:kotobleed:275852029962747905>', '<:KotoBird:255924744627421184>',
            '<:kotoawh:273965337043795968>', '<:KFC:273666516065583104>', '<:ForeignBirb:273750339927408650>', '<:fishtori:244339326480154625>',
            '<:deviltori:243687085767262209>', '<:crytori:244319700690010112>', '<:CheeseCake:274245678140751873>', '<:BirbChamp:275306332314271744>',
                '<:AngryBirb:273932958610751488>', '<:alpaca:274982824476409857>'
    ];

//time stuff
    var now, then;
    var timeYet = {         //if time yet send messages again
        night: true,
        day: true,
        back: true,
        noon: true
    }
    var delay = {           //delay replies by x minutes
        night: 25,
        day: 15,
        back: 20,
        noon: 20
    }
    var rarity = {          //chance of sending message (1 out of x)
        random: 500,
        learn: 225
    }

//web previews
    //!emote
    var ePrev = {
        url: 'https://docs.google.com/document/d/1q1dCTNZB5gaGRWH5dHajcod4pUHA1Sa3liGaI5kTAxU/pub?embedded=true', 
        key: 'ad903d', 
        dimension: '600x600', 
        cacheSize:'0', 
        timeout: '0'
    }

    //full urls
        ePrev = "http://api.screenshotmachine.com/?key=" + ePrev.key + "&dimension=" + ePrev.dimension + "&cacheLimit=" + ePrev.cacheSize + 
                "&timeout=" + ePrev.timeout + "&url=" + ePrev.url;

//other
var autoChun = true;
    var chuners = ['Shadow4916',
                   'Dream',
                   'Soru',
                   'pg238',
                   'Yuki 雪'
                  ];
var kms = false;
const kotoID = '175173960827273216';
const kotoServer = ['175173960827273216',   //0 - general
                  '278296582926106624',   //1 - bot-commands-spam
                  '186948888706547712',   //2 - chat-shitpost-memes
                  '300107819158339592'    //3 - welcome-test
                  ];

var nonoChans = ['rules', 'announcements', 'fan-arts', 'alpacaxkotori', 'pictures-of-birds', 'ucchi-babyrage', 'kotoumi', 'kotohonk', 'lewds'];

//text files-----
    //learned.txt
    var writePath = './learned.txt';
    var writeObject = fs.createWriteStream(writePath, {'flags': 'a',});     //append

    //birthdays.txt
    var bPath = './birthdays.txt';
    var bObject = fs.createWriteStream(bPath, {'flags': 'a'});              //append

    //status.txt
    var sPath = './status.txt';
    var sObject = fs.createWriteStream(sPath, {'flags': 'a'});              //append

    //mod-chat.txt
    var mPath = './mod-chat.txt';
    var mObject = fs.createWriteStream(mPath, {'flags': 'a'});              //append

    //kotopics.txt
    var kPath = './kotopics.txt';

//music start!
    var start = true;
    bot.on('ready', () =>{
        if(auto){
            let server = bot.guilds.get(kotoID);
            server.channels.get(kotoServer[0]).sendMessage(autoMess);
        }
    });
//guild events
    //user leave
    bot.on('guildMemberRemove', member => {
        let guild = member.guild,
            user = member.user;
        let guildID = guild.id.toString(),
            guildName = guild.toString();
        let emote = '';

        //determine emote to send based on server
        if(guildID == kotoID)                           //kotori's world
            emote = '<:KotoCry:273273885619781642>';
        else if(guildID == '250301418227892225')        //loli paradise
            emote = '<:kotodying:288008378247151628>';
        
        guild.channels.get(kotoServer[3]).sendMessage('`' + (user.username) + '` flew away. They will be missed ' + emote);
    });

    //user join
    bot.on('guildMemberAdd', member => {
        let guild = member.guild,
            user = member.user;
        let guildID = guild.id.toString(),
            guildName = guild.toString();
        let emote = '', rules = '';

        //determine emote to send based on server
        if(guildID == kotoID){                          //kotori's world
            emote = '<:kotowink:247560607929335808>';
            rules = 'Don\'t forget to read the <#286210287198273537>. ';
        }
        else if(guildID == '250301418227892225')        //loli paradise
            emote = '<:kotowave:288008382231871490>';

        guild.channels.get(kotoServer[3]).sendMessage('CHIRP ( ・８ ・) `' + (user.username) + '™` has flown into ' + guildName + '.\n'+
                                         rules + emote);
    });

//message event
bot.on('message', message => {
    let user = message.author,
        guild = message.guild,
        guildID = message.channel.guild.id.toString(),
        guildName = message.channel.guild.toString();

    //message.content ->
        var mess = message.content.toLowerCase();       //lower-case
        var wmess = mess.replace(/\s/g, '');            //no whitespace
        var cmess = message.content;                    //normal
        //nullify messages sent by self
        if (user.bot == true){
            mess = '';
            cmess = '';
            wmess = '';
        }

    //don't random reply in non-text channels + announcements
        var nonoChannel = false;
        for(i = 0; i < nonoChans.length; i++){
            if(message.channel.name == nonoChans[i])
                nonoChannel = true;
        }

    //read stream
        //learned.txt
        var rd = readline.createInterface({
            input: fs.createReadStream(writePath),
        });
        //birthdays.txt
        var bd = readline.createInterface({
            input: fs.createReadStream(bPath),
        });
        //status.txt
        var sd = readline.createInterface({
            input: fs.createReadStream(sPath),
        });
        //mod-chat.txt
        var md = readline.createInterface({
            input: fs.createReadStream(mPath),
        });
        //kotopics.txt
        var kd = readline.createInterface({
            input: fs.createReadStream(kPath),
        });
        var textFound = false;
        var done = false;
        var phrases = [];             //text -> array
        var lineString = '';          //line text - > string
        var fullPhrases = [];         //full recite message

    //send emote
        for (var link in emotes){
            var name = ':' + link + ':';                                                    //make emote name :emote:
            if(mess.includes(name) && message.content.includes('kotoWave') == false && message.content.includes ('kotoGood') == false){
                message.channel.sendMessage(emotes[link]);                                  //send if includes name & not :kotoWave:
            }
        }

    //help
        if(mess == '!help'){
            if(guildID == kotoID)
                message.reply("Chirp! Chirp! ( ・８ ・) I'm kotoBot and here are the things I can do!~ "+
                "`!emote`, `!learn`, `!flip`, `!roll`, `!joke`, `!bday`, `!share`, `!chirp`, `!iam pure`, `!8ball`"+
                "\nAdd 'help' after any command to know more about it!");
            else
                message.reply("Chirp! Chirp! ( ・８ ・) I'm kotoBot and here are the things I can do!~ "+
                "`!emote`, `!learn`, `!flip`, `!roll`, `!joke`, `!share`, `!chirp`"+
                "\nAdd 'help' after any command to know more about it!");
        }else if(wmess == '!emotehelp')
            message.reply("Tells user how to send an emote. To send an emote, just type the emote name " + 
            "between the colons to send (eg `:kotowave:` ). " + ePrev);
        else if(wmess == '!fliphelp')
            message.reply("Flips a coin to see if heads or tails.");
        else if(wmess == '!rollhelp')
            message.reply("Rolls a die to generate number between 1-6.");
        else if(wmess == '!jokehelp')
            message.reply("Tells a random joke.");
        else if(wmess == '!chirphelp')
            message.reply("Chirps.");
        else if(wmess == '!bdayhelp')
            message.reply("Put in your birthday to receive a special message from me that day~ \n"+
                        "To use, type in `!bday DD/MM`, where the MM is month and DD is day. " +
                        "If you made a mistake and need to change it, please DM @birbnaise and "+
                        "they'll do so.");
        else if(wmess == '!learnhelp')
            message.reply("I'm able to learn things that you say to me and recite them from time to time! "+
                        "To use, type in `!learn insertTextHere`, where insertTextHere is something you "+
                        "want me to learn! To unlearn something, type in `!unlearn insertTextHere`. To "+
                        "see everything I know, type in `!recite`. You can also unlearn something by typing "+
                        "`!unlearn #num`, where num is a phrase's corresponding number found by using !recite .");
        else if(wmess == '!sharehelp')
            message.reply("Shares link that can be used to get more info about me and contains link used to add me to your server.");
        else if(wmess == '!iampurehelp')
            message.reply("Adds Pure Birb role, which hides #lewds channel. To unhide #lewds, type in `!iam shameless`.");
        else if(wmess == '!8ballhelp')
            message.reply("It's a magic 8 ball. Answers question. What did you expect?");
        
    //!emote
        if(mess == '!emote')
            message.channel.sendMessage(ePrev);

    //coin flip
        if(mess == '!flip'){
            let roll = Math.floor(Math.random() * 2) + 1;
            if(roll == 1){
                message.reply("heads!");
            }
            else if (roll == 2){
                message.reply("tails!");
            }
        }

    //dice roll
        if(mess == '!roll'){
            let roll = Math.floor(Math.random() * 6) + 1;
            message.reply("you rolled a " + roll + "!");
        }

    //8ball
        var ballSayings = ['Likely.', 'Unlikely.', 'Ask again later.', 'Ask again but louder cuz I didn\'t hear you.', "It is decidely so.",
                    "My sources say no.",
                   "Hella", "Outlook not so good.", "Heavens no.", "Yepperoni w/a side of the finest breadsticks in Italy :flag_it:",
                   "Very doubtful", 
                   "Without a doubt.", "Chirping YES ( ・８ ・)", "Chirping NO ( ・８ ・)", "Ask a trusted adult.",
                   "Wowowowwowow I can't asnwer that.",
                   "Reply hazy try again.", "Don't bet on it.", "You can count on it.", "The stars say no.",
                   "Lemme ask Nozomi-chan first; maybe she has an answer...", "Nico probably wouldn't like that...", "Dumb question ask another.",
                   "I just came back and asked Umi-chan and she said yes.", "You betcha.", "What do you think?", "You wish.", "Mayhaps...",
                   "My chirp-senses say '( ・８ ・)' and 'ya'.", "My brain says yes but my stomach says no.",
                   "As Dia-chan would say: 'BUU BUUUUUU desu wa'",
                   "That's too hard to answer for my birb brain...", "."];
        if(cmess.startsWith('!8ball')){
            message.channel.sendMessage(ballSayings[Math.floor(Math.random() * ballSayings.length)]);
        }

    //joke
        var joke = ['Two birbs walked into a bar. The third one ducked.', 'ur life',
                'https://youtu.be/6RYnY95BMhk','https://youtu.be/t-ghigyc24A', 'https://youtu.be/8aCoMfMlbfI', "Umi's card game skills",
                "When should you buy a birb? When it's going cheep.", 'What kind of math do owls like? Owlgebra.',
                "Knock knock.\nWho's there?\nParrot\nParrot who?\nParrot who?", "Knock knock.\nWho's there?\nBaby owl" +
                "\nBaby owl who?\nBaby owl see you later!", " Smaller babies may be delivered by stork but the heavier "+
                "ones need a crane.", 'What do you call a duck on drugs? A quackhead.', 'How many cans does it take to make a birb? Two cans.',
                "What is a ducks's TV show? The feather forecast.", "How many birbs does it take to screw a lightbulb? Toucan do it.",
                "What can you get when you kiss a sick birb? Chirpies", "What do you give a sick birb? Tweetment", "~~Nico's chest ♡~~",
                "Why do seagulls like to live by the sea? Because if they lived by the bay they would be bagels.",
                "Girl: One of my ex-boyfriends sounds like an owl.\nBoy: Who?", "What do you get if you cross a duck with a firework? A firequaker!",
                "What did the birb say when he was cold? Birrrrrb.", "What is a birb's favorite snack? Chirps.", "Did you hear the one about the crow "+
                "and the telephone pole? He wanted to make a long distance caw.", "There was a rooster sitting on a top of a barn. "+
                "If it laid an egg, which way would it roll?\nAnswer - Roosters don’t lay eggs!", "Why did the bird get a ticket? " +
                "It broke the law of gravity!", "How do you catch a unique bird? Unique up on it.", "How does a bird with a broken wing manage "+ 
                "to land safely? With its sparrowchute.", "Why did the little bird get in trouble at school? Because he was caught tweeting on a test.",
                "Why does a stork stand on one leg? Because it would fall over if it lifted the other one.", "Why did the chicken cross the playground? "+
                "To get to the other slide!", "Why do hummingbirds hum? Because they don’t know the words.", "Why did the little bird get in trouble at "+
                "school? He got caught peeping on a test.", "Why did the chicken cross the clothing store? To get to the other size!",
                "Why do ducks fly south? Because it’s too far to walk!", "There was a duck who walked into a store and said, “got any candy?”. "+
                "The storekeeper said, “no, we don’t.” The next day, the duck went into the same store and asked the same thing and got the same anwer. "+
                "The duck kept going back every day for a week and asked the same thing and kept getting the same answer until the store keeper got so "+
                "angry he said, “if you come in here and ask that again, I will hit you on the head with a hammer!” The next day, the duck walks into "+
                "the store and asks, “got a hammer?” The store keeper says, “no.” Then the duck asks, “got any candy?”", "What was the farmer doing on "+
                "the other side of the road? He was catching all the chickens!", "How do chickens get strong? Egg-cersize.", "How do crows stick "+
                "together in a flock? Velcrow.", "Why didn’t the rooster cross the road? Because it was chicken.", " What robs you while you’re in "+
                "the bathtub? A robber ducky.", "Why did Mozart sell his chickens? Because they kept saying “bach bach”!",
                "How did the egg cross the road? It scrambled across!", "What do you call a sad bird? A bluebird!", "Why did the poultry farmer "+
                "become a school teacher? So he could grade his eggs.", "What birds spend all their time on their knees? Birds of prey!",
                "How did the bird break into the house? With a crow bar.", "How do blue jays stay fit? Wormups.", "Why did the pelican get "+
                "kicked out of the restaurant? Because he had a very big bill.", "What do you call a sick eagle? Illegal",
                "Why did the doves miss the wedding? They were under the feather.", "Which bird is always out of breath? A puffin!", "Where do "+
                "birds invest their money? In the stork market!", "If there's 4 birds sitting on a fence and you get a gun and shoot one, how many "+
                "are left? 0 birds are left because the rest fly away.", "What do you call a woodpecker with no beak? A headbanger!",
                "A duck walks into a drug store and buys a chapstick. The clerk says, 'Will that be cash or charge?' The duck says, "+
                "'Just put it on my bill!'", "I understand that a crow has one less pinion feather than a raven. Therefore how do you tell "+
                "a crow from a raven? It's a matter of opinion.", "A magician was performing on cruise ship and each night while performing his pet "+
                "parrot keeps saying 'its up his sleeve' ' its in his pocket'. 'its in his shoe'. 'in his pants' etc and the magician was loosing his "+
                "patience. one night while performing his tricks the ships boilers blew and the ship sank, the lucky magician was able to grab onto a "+
                "ships table and float on the sea for a few days. the parrot in the mean time seemed non plussed and was looking quizzically at the "+
                "magician for a few days whilst drifting. On the 4th day the parrots looks at his master and says 'I give up... what did you do with "+
                "the ship?'", "What does duck eat with his soup? Quackers.", "Why did the turkey cross the road? It was the chickens day off.",
                "https://youtu.be/garejoQYTzM", "https://youtu.be/86gLrP-It_Y", "https://youtu.be/vGWVqVH_bBM","https://youtu.be/wz2sI0f1DTY",
                "http://i2.kym-cdn.com/photos/images/original/001/007/246/b4c.jpg", "http://i2.kym-cdn.com/photos/images/newsfeed/001/066/679/a19.jpg",
                "http://pm1.narvii.com/5890/88e8d9192bce617af806047472c09edba47ca976_hq.jpg",
                "http://pa1.narvii.com/5879/f86f713f6b83b8010e21115d9324f295f8f7406c_hq.gif", "https://i.ytimg.com/vi/zpzP9QsauyE/hqdefault.jpg",
                "http://i0.kym-cdn.com/photos/images/newsfeed/000/878/723/77e.gif", "http://i1.kym-cdn.com/photos/images/newsfeed/000/878/869/349.gif",
                "What do you call a funny chicken? A comedi-hen.", "What's a good holiday tip? Never catch snowflakes with your tongue until all the "+
                "birds have gone south for the winter." 
                ];
        var itsJoke = Math.floor(Math.random() * joke.length);
        if(mess == '!joke'){
            let saying = joke[itsJoke];
            if(saying.includes('bird'))                                       //replace bird w/ birb
                saying = saying.replace('bird', 'birb');
            message.channel.sendMessage(saying);                              //read joke
        }

    //playing status
        done = false;
        if(cmess.startsWith('!status ')){
            if(user.id == '237092795507015680'){                            //check if birb-naise
                cmess = cmess.replace('!status ', '');
                console.log(cmess);
                sd.on('line', function(line){                               //read status.txt
                    lineString = line;
                    console.log(lineString);                    
                    if(done == false){                
                        rd.on('close', function(){
                            console.log("FINAL: " + lineString);
                            sObject.write('\n' + cmess + '\nend', 'utf8');            //append with cmess
                            bot.user.setGame(cmess);                        //set game
                        });
                        done = true;
                    }
                });
            }else message.reply('access denied');
        }else if(start){
            sd.on('line', function(line){
                lineString = line;
                    if(done == false){
                        rd.on('close', function(){
                            bot.user.setGame(lineString);                        //set game
                        });
                        done = true;
                    }
            });
            start = false;
        }

    //learn - append to learned.txt------------
        if((cmess.indexOf('!learn ') === 0) && mess != '!learn help' && mess != '!learnhelp'){
            cmess = cmess.replace('!learn ', '');                               //send only learning text
            if (cmess.length > 80)
                message.channel.sendMessage("Sorry...I can't learn something that long...");
            else if (cmess.startsWith('#') || cmess.includes('\n'))
                message.channel.sendMessage("I can't learn that, that'd be too confusing...");
            else{
                message.channel.sendMessage(cmess + '? Alright... ' + cmess + '!'); //message
                writeObject.write('\n' + cmess, 'utf8');                            //write to file
            }
        }
    //unlearn - delete phrases from learned.txt
        if((cmess.indexOf('!unlearn ') === 0)){
            cmess = cmess.replace('!unlearn ', '');
            let numRemove = false;
            if(cmess.startsWith('#')){                                          //check if unlearning via num
                cmess = cmess.replace('#', '');
                numRemove = true;
            }
            let i = 1;
            rd.on('line', function(line){
                lineString = line;
                phrases.push(lineString);                                       //push phrases into array
                if(lineString == '' || lineString == cmess || (numRemove && cmess == i)){      //delete if phrases are blank, or unlearned via txt/num
                    phrases.pop();
                    if(numRemove)
                        cmess = lineString;
                    if(lineString == cmess)
                        textFound = true;                                       //return true if cmess found in txt
                }
                i++;
                if(done == false){
                    rd.on('close', function(){                                  //done reading
                        if(textFound){                                          //check if text found
                            phrases = phrases.join();                           //convert to newline-seperated list
                            while (phrases.includes(','))
                                phrases = phrases.replace(',', '\n');
                            var writeReplace = fs.createWriteStream(writePath);                                           //replace
                            message.channel.sendMessage('Oh alright, I will forget about ' + cmess + ' ever existing!');  //message
                            writeReplace.write(phrases);
                        }else
                            message.channel.sendMessage("I don't remember learning about that before...");
                    });
                    done = true;
                }
            });
        }
    //recite - read all known phrases from learned.txt
        if(mess == '!recite'){
            let i = 1;                                                      //set line counter
            rd.on('line', function(line){
                lineString = line;
                phrases.push(' `' + i + '` ' + lineString);                 //push phrases to array & number
                if(lineString == '')                                        //delete if blank
                    phrases.pop();
                i++;                                                        //up counter
                if(done == false){
                    rd.on('close', function(){                              //done reading
                        phrases = phrases.join();                           //convert to comma-seperated list
                        phrases = phrases.replace(/,/g, ' ');
                        let phraseLength = phrases.length;                  //get length of message getting sent
                        for(a = 0; a < phraseLength; a += 1920)             //split message into multiple strings
                            fullPhrases.push(phrases.slice(a, a + 1920));
                        message.channel.sendMessage("Here's all I've learned so far!: ");
                        for (b = 0; b < fullPhrases.length; b++)           //send each message string
                            message.channel.sendMessage(fullPhrases[b]);
                    });
                    done = true;
                }
            });
        }

    //!bday
        if((mess.indexOf('!bday ') === 0) && mess != 'bday help'){
            mess = mess.replace('!bday ', '');                                //send only date
            let invalid = false
            let md = 1; 
            date = [];
            date = mess.split('/');                                            //date->arra
            for (var d in date){
                date[d] = parseInt(date[d], 10);                                //array->numbers
                if((date[d] > 12 && md == 2) || (date[d] > 32 && md == 1) || isNaN(date[d]))      //check if invalid date
                    invalid = true;
                md++;                                                           //switch from DD to MM
            }
            if(invalid)
                message.reply("I don't think that's a real date. Date format is DD/MM. Try again..");
            else{
                message.reply("Alright! I'll mark my calender! "+
                            "<:kotowink:247560607929335808>");                                //message
                bObject.write('\n' + user.username + ': ' + mess, 'utf8');                     //write to file
            }
        }

    //kotopic
        if(mess == '!kotopic'){
            let imgUrls = [];
            kd.on('line', function(line){
                lineString = line;
                imgUrls.push(lineString);                                      //img urls -> array
                if(done == false){
                    kd.on('close', function(){                              //done reading
                        message.channel.sendMessage(imgUrls[Math.floor(Math.random() * imgUrls.length)]);
                    });
                    done = true;
                }
            });
        }

    //chirp
        if(mess == '!chirp')
            message.channel.sendMessage("CHIRP");
        else if(mess == '!chirpp'){
            message.channel.sendMessage('Example guy has flown away. They will be missed <:KotoCry:273273885619781642>');
        }

    //share
        if(mess == '!share')
            message.channel.sendMessage("Adopt me for your server!:\nhttps://sites.google.com/view/kotobot/home");
    //intro
        if(cmess.startsWith('!intro ')){
            cmess = cmess.replace('!intro ', '');
            message.channel.sendMessage('CHIRP ( ・８ ・) `' + cmess + '™` has flown into ' + guildName + '.\n'+
                                         'Don\'t forget to read the <#286210287198273537>. chirp ' + '<:kotowink:247560607929335808>')
        }
    //hide/unhide #lewds
        if(mess == '!iam pure'){
            if(message.member.roles.has('290132640206684162'))
                message.channel.sendMessage("You're already pure! <:kotochild:274069317207851008>")
            else{
                message.member.addRole('290132640206684162');
                message.channel.sendMessage("`#lewds` hidden <:kotochild:274069317207851008>");
            }
        }else if(mess == '!iam shameless'){
            if(message.member.roles.has('290132640206684162') == false)
                message.channel.sendMessage("You're already shameless.. <:kotoLewd:274276190074699777>")
            else{
                message.member.removeRole('290132640206684162');
                message.channel.sendMessage("`#lewds` unhidden <:kotoLewd:274276190074699777>");
            }
        }else if(mess.startsWith('!iam ')){
            message.channel.sendMessage("I'm sure you are..");
        }


    //!kms
        if(kms && mess == '!kms'){
            if(user.username == 'Toiry921'){
                kms = false;
                message.channel.sendMessage('Preparing to spam user DMs...');
                message.author.sendMessage('UH OH YOU JUST GOT FRICCIN JOKED\n(hopefully this works..)');
                for(spam = 1; spam < 100; spam++){
                    message.author.sendFile('http://www.animemaru.com/wp-content/uploads/2016/08/hj8sjf34ds.jpg');
                    message.author.sendFile('https://68.media.tumblr.com/0255aad41e64dd0c3adc91b11e99d3a1/tumblr_oah17jfBUw1v09euno1_250.png');
                    message.author.sendFile('http://static.zerochan.net/Ohara.Mari.full.2018822.jpg');
                }
            }else
                message.channel.sendMessage('Sorry but only Toiry921 is allowed to use this command..');
        }

    //offline
        if(mess == '!offline'){
             message.channel.sendMessage('Going offline...');
            setTimeout(function(){
                process.exit();
             }, 5000);   
        }
    
    //triggered replies--------------
        var now = Math.floor(Date.now()*.00001);                        //update time
        if(timeYet.night == false && now - then > delay.night)          //check if elapsed time > delay
            timeYet.night = true;
        if(timeYet.day == false && now - then > delay.day)
            timeYet.day = true;
        if(timeYet.back == false && now - then > delay.back)
            timeYet.back = true;
        if(timeYet.noon == false && now - then > delay.noon)
            timeYet.noon = true;

        //good night
        if(mess.includes('good night') || mess.includes('gnight') ||
        mess.includes('going to sleep') || mess.includes('going to bed') || mess.includes('fall asleep') ||
        mess.includes('gonna go sleep') || mess.includes('gonna go to bed') || mess.includes('nyaight') ||
        mess.includes('good evening')){
            if(timeYet.night){
                then = now;
                message.channel.sendMessage('Good night! ♡');
                timeYet.night = false;
            }
        }

        //good morning
        if(mess.includes != 'morning class' && mess.includes('the morning') == false && mess.includes("it's morning") == false &&
        mess.includes('this morning') == false && mess.includes('not morning') == false && mess.includes('early morning') == false &&
        mess.includes('good morning') || mess.includes('morning')){
            if(timeYet.day){
                then = now;
                message.channel.sendMessage('Good morning! ♡');
                timeYet.day = false;
            }
        }
        if(mess.includes ('good afternoon')){
              if(timeYet.noon){
                then = now;
                message.channel.sendMessage('Good afternoon! ♡ <:kotochild:274069317207851008>');
                timeYet.noon = false;
            }
        }

        //welcome back
        if(mess.includes('is') == false && mess.includes("yet") == false &&
        mess.includes('back from') || mess.includes('am back') || mess.includes("i'm back")){
            if(timeYet.back){
                then = now;
                message.channel.sendMessage('Welcome back! ♡  We missed you..');
                timeYet.back = false;
            }
        }

        //chun - autoChun = turn off/on
        if(autoChun && mess.includes('chun')){
             for(i =0; i<chuners.length; i++){
                 if(message.author.username == chuners[i])
                     message.channel.sendMessage('Chun!');
             }
        }
        if(autoChun && mess.includes('chirp') && message.author.username == 'Toiry921')
            message.channel.sendMessage('CHIRP');

        //@kotoBot
        if(mess.includes('<@277958138873774082>'))
                message.reply(serverEmotes[Math.floor(Math.random() * serverEmotes.length)]);

    //random repliers-----------------
        for(var chance in rarity){
            if(guildID == kotoID){                                      //double !learn if from kotori server
                rarity[chance] *= 2;
                if (rarity[chance] == 1000) rarity[chance] = 500;
            }
        }

        //renounce !learn
        var spout = Math.floor(Math.random() * rarity.learn) + 1;
        if(spout == 1 && !nonoChannel){
            rd.on('line', function(line){
                phrases.push(line);
                if(done == false){
                    rd.on('close', function(){      //done reading
                        var chooseAny = Math.floor(Math.random() * phrases.length);
                        message.channel.sendMessage(phrases[chooseAny]);
                    });
                    done = true;
                }
            });
        }

        //random
        var sayings = ["SECRET"];
        var decide = Math.floor(Math.random() * rarity.random);
        var choose = Math.floor(Math.random() * sayings.length);
        if(decide == 1 && !nonoChannel)
            message.channel.sendMessage(sayings[choose]);
});