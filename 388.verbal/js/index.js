var corrects = 0;
  var falses = 0;

$(document).ready(function() {
  $("#answer").css("visibility", "hidden");
  $("#qid").css("visibility", "hidden");
  $("#reset").css("visibility", "hidden");
  $("h2").css("visibility", "hidden");
  $("form").css("visibility", "hidden");
  $("#next").css("visibility", "hidden");
  $("#check").css("visibility", "hidden");
  $(".progress").css("visibility", "hidden");
  
  
 });

$("#reset").on("click", function() {
  location.href = location.href

});

$("#start").on("click", function() {
  next();
   var fiveMinutes = 60 * 35,
        display = $('#time');
    startTimer(fiveMinutes, display);
$("#reset").css("visibility", "visible");
  $("h2").css("visibility", "visible");
  $("form").css("visibility", "visible");
  $("#next").css("visibility", "visible");
  $("#check").css("visibility", "visible");
  $(".progress").css("visibility", "visible");
});

$("#next").on("click", function() {
  
  checkAnswer();
  next();
   

});

$("#check").on("click", function() {
  
  showAnswer();
  
   

});

function showAnswer(){
  var correct = $( "#answer" ).text().toLowerCase();
  
  $("#"+correct).css('font-weight', 'bold');
  
}


function checkAnswer(){
  var answer =$( "input:checked" ).val();
  var correct = $( "#answer" ).text();
  var qid = $( "#qid" ).text();
  
  
  if (answer == correct) {series.push(" "+qid + ": "+ answer + " is correct");
               corrects++;           }
  else {series.push(" "+qid + ": "+ answer + " is wrong " + correct +" is correct");
     falses++;           }  
       
  
  
}

function next() {
  var id = getRandomArbitrary(); 
  
  for (var i = 0; i < ids.lenght; i++) {
    if(id=ids[i]){
      var id = getRandomArbitrary(); 
      }
}
  
  
  var step =series.length;
  //console.log(id);
  
  $("#text").text(json[id].text);
  $("#a").text(json[id].a);
  $("#b").text(json[id].b);
  $("#c").text(json[id].c);
  $("#d").text(json[id].d);
  $("#a").css('font-weight', 'normal');
  $("#b").css('font-weight', 'normal');
  $("#c").css('font-weight', 'normal');
  $("#d").css('font-weight', 'normal');
  $("#answer").text(json[id].correct);
  $("#result").text(series);
  $("#qid").text(id+1);
  $( "input:checked" ).prop('checked', false);
  $(".progress-bar").css("width", step/20*100+"%");
  $(".progress-bar").text(step/20*100+"%");
  $("#correct").text(corrects); 
  $("#false").text(falses); 
}

function getRandomArbitrary() {
  var min = 0;
  var max = json.length-1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}




var series = [];
var ids = [];

var json =[
  {
    "text": "The Mosquitia region of Honduras and Nicaragua holds the largest rain forest in Central America. This covers some 20,000 square miles of dense vegetation, swamps, and rivers. From above it may look inviting, but anyone venturing into it faces a host of dangers: deadly snakes, hungry jaguars, and noxious insects, some carrying potentially lethal diseases. The persistence of the myth of a hidden White City in the region owes a great deal to the forbidding nature of this wilderness. But the origin of the legend is obscure. Explorers, prospectors, and early aviators spoke of glimpsing  the white turrets of a ruined city rising above the jungle. Others repeated tales, first recorded by Hernan Cortes in 1526, of fabulously rich towns hidden in the Honduran rainforests. Anthropologists who spent time in the 1960's with the Miskito, Pech, and Tawahka Indians of Mosquitia heard stories of a #White House. This was believed to be a refuge where indigenous people retreated from the Spanish conquest, never to be seen again. (ngm.nationalgeographic.com) ",
    "a": "The myth of a hidden White City relates to a 16th century refuge where indigenous people retreated from the Spanish conquest",
    "b": "The dense vegetation, snakes. jaguars and deadly insects mean that nowadavs few people other than anthropologists ever visit the Mosquitia region.",
    "c": "The stories passed down through the years tell tales of rich towns and ruins oi white buildings obscured by trees and vegetation. ",
    "d": "From above the Mosquitia region of Honduras and Nicaragua is daunting, with s-wamps and rivers standing out against dense vegetation. ",
    "correct": "C"
  },
  {
    "text": "It's tempting to say that the announcement of liquid water on the surface of Mars heralds a new era in artian exploration. You might think that the first human explorers on Mars will park next to a salty stream and use it to manufacture fresh drinking water.  aybe they could even find life in damp Martian nooks and crannies, areas where the dusty red planet can still fuel microbes. Reality is much more subtle. Finding evidence for flowing water is not the same as finding life. Right now, scientists don't know where this water is coming from, or if the chemistry in these Martian rivers is even life-friendly. And unfortunately, chances are it will be a long time before we can get there to find out . It's hard to get a spacecraft clean enough to send a land vehicle or rover there right now, says Amanda Livery, a planetary geologist at Getech, referring to concerns about hitchhiking Earth microbes contaminating the artian surface. ''But there's still reason for excitement. Places where we can see signs of water are probably the best place to look for modern life. (news. nationalgeographic.com) ",
    "a": "Finding evidence of water on Mars gives scien-tists valuable clues about where to look for sign of life on the planet.",
    "b": "Vehicles could reach the source of Martian water but concerns have been voiced about contamination from earth microbes.",
    "c": "Getech have a deaning solution that can easily prevent hitchhiking microbes from contami-nating the surface of Mars. ",
    "d": "Evidence of life has been found in damp artian nooks and crannies where the planet i able to fuel microbes. ",
    "correct": "A"
  },
  {
    "text": "The most dangerous cancer cells are \nthe ones that can break a,,~ay from the primary tumor and travel through the body to form a new tum or in another tissue, a process called metastasis. Fortunately, only a small percentage of cancer cells have the ability to become new tumors. Unforturtately, the tumor¬seeding cells are the ones hardest to kill with chemotherapy - and it only takes \na lone survivor to mount a resurgence. One hotly debated question is ,,Thether metastatic cells share characteristics \nof stem cells, and if so, to what extent. Some studies have found cancer cells with stem-cell markers and some that displayed stem-cell-like behavior, and yet other studies have suggested that cells can spontaneously switch from a primary cancer cell to a stem-cell-like cancer cell and back. (Science Dail11) ",
    "a": "Cancer cells that can behave like stem cells are responsible for recurrences after surgery or treatment.",
    "b": "Cancer cells that can depart from a primary tumor are the most difficult to kill with hemotherapy ",
    "c": "Cancer cells that have stein-cell-like characteristics are highly metastatic and the most dangerous. ",
    "d": "Small percentage of cancer cells are capable of seeding new tumors but they must work together to do so ",
    "correct": "B"
  },
  {
    "text": "For tens of millions of years, Earth's oceans have maintained a relatively stable acidity level. But research shows that this ancient balance is being undone by a recent and rapid drop in surf ace \npH that could have devastating global consequences. Since the beginning of the industrial revolution in the early 1800s, fossil-fuel-powered machines have driven an unprecedented burst \nof human industry and advancement. The unfortunate consequence, however, has been the emission of billions \nof tons of carbon dioxide (C02) and other greenhouse gases into Earth's atmosphere. Scientists now know that about half of this anthropogenic, or man-made, C02 has been absorbed over time by the oceans. This has benefited us by slowing the climate change these emissions would have instigated if they \nhad remained in the air. But relatively new research is finding that the introduction of massive amounts of CO2 into the seas is altering water chemistry and affecting the life cycles of many marine organisms. (National Geographic)",
    "a": "The recent decrease in ocean surface pH is linked to the burning of fossil fuels that dates to the early 1800s. ",
    "b": "According to scientists, about a third of man-made carbon dioxide has been taken in by the world's oceans. ",
    "c": "Unless emissions of greenhouse gases are curbed, marine life could decrease by half in the coming years. ",
    "d": "The world's oceans have recently absorbed large amounts of C02,. which has increased the rate of climate change. ",
    "correct": "A"
  },
  {
    "text": "Education\ndoes not stop. Professors must update and develop their technical skills\nthroughout their careers. But as they progress, few take the time – or are\noffered the opportunity - to become educated in how to be an effective leader.\nAs a consequence, academic teams waste time dealing with unproductive\ninterpersonal issues, lack of motivation and unnecessary conflict. When things\ndo not run smoothly, the costs in terms of money, productivity and retention of\ntalent are high. Leaders should inspire others to achieve goals. Professors\nlead research teams and manage teaching staff. They also have to lead\nintellectually, making advances in engineering and science that benefit society.\nThe importance of leadership skills grows as scientists gain seniority. Even\nwell-meaning professors can create chaos by bossing people and failing to take\ninto account the emotions of others. Equally, those who take a back seat can\ncreate teams that are much less effective. (nature.corn)",
    "a": "Academic teams fail due to the conflict caused\nby poor leadership that does not tackle inter¬personal issues and low motivation.",
    "b": "It is important that senior academics build strong leadership and technical skills in order to be effective in their roles.",
    "c": "An abundance of opportunities for promotion explains why academics do not focus on devel-oping their leadership skills",
    "d": "Seniority is not relevant when considering the leadership skills necessary for scientists whereas the ability to read emotions is",
    "correct": "B"
  },
  {
    "text": "At the ludi meridiani, or midday games, criminals, barbarians, prisoners of war and other unfortunates, called damnati, or \"condemned,\" were executed. (Despite numerous accounts of saints' lives written in the Renaissance and later, there is no reliable evidence that Christians were killed in the Colosseum for their faith.) Some damnati were released in the arena to be slaughtered by fierce animals such as lions, and some were forced to fight one another with swords. Others were dispatched in what a modern scholar has called \"fatal charades,\" executions staged to resemble scenes from mythology. The Roman poet Martial, who attended the inaugural games, describes a criminal dressed as Orpheus playing a lyre amid wild animals; a bear ripped him apart. Another suffered the fate of Hercules, who burned to death before becoming a god. (smithsoniamag.com)",
    "a": "Historical evidence proves that no Christians were killed at the Colosseum, along with war prisoners and barbarians.",
    "b": "All damnati were forced to participate in staged executions involving characters and scenes from mythology.",
    "c": "During the morning games, spectators could witness wild beast hunts involving fierce animals such as lions and bears.",
    "d": "As part of their execution, a criminal could find themselves facing a wild beast or sword fighting another person.",
    "correct": "D"
  },
  {
    "text": "Dr Caroline Lyon, Professor Chrystopher Nehaniv and Dr Joe Saunders have carried out experiments as part of the iTalk project with the childlike iCub humanoid robot to show how language learning emerges. Initially the robot\ncan only babble and perceives speech as a string of sounds, not divided up into words. After engaging in a few minutes of \"conversation\" with humans, in which the participants were instructed to speak to the robot as if it were a small child, the robot adapted its output to the most frequently heard syllables to produce some word forms such as the names of simple shapes and colours. Dr Caroline\nLyon said: .ult is known that infants are sensitive to the frequency of sounds in speech, and these experiments show how this sensitivity can be modelled and contribute to the learning of word forms by a robot.\" (Science Daily)",
    "a": "According to Dr Caroline Lyon, our current knowledge of how infants perceive language can help robots learn word forms.",
    "b": "When robots are starting to learn language skills, they readily recognize individual speech units including words.",
    "c": "Experiments that are part of the iTalk project have shown that robot develops more quickly than humans",
    "d": "After a few minutes of “conversation” with humans, a robot will adapt its output to the most frequently heard inflections",
    "correct": "A"
  },
  {
    "text": "Leonardo da Vincifs Vetruvian Alan is the attempt to illustrate the idea, set down by Vitruvius in the Ten Books, that the human body can be made CO fit inside a circle and a square. This was more than a geometrical statement. Ancient thinkers had long invested the circle and the square with symbolic powers. The circle represented the cosmic and the divine; the square, the earthly and the secular. Anyone proposing that a man could be made to fit inside both shapes was making a metaphysical proposition: The human body wasn't just designed according to the principles that governed the world; it was the world, in miniature. This was the theory of the microcosm, and Leonardo hitched himself to it early in his career. \"By the ancients,\" he wrote around 1492, \"man was termed a lesser world, and certainly the use of this name is well bestowed, because ... his body is an analogue for the world.\" (smithsonianmag.com) ",
    "a": "Viewing the body as a miniature representation of the world was the key to Leonardo da success as an artist. ",
    "b": "According to ancient thinkers, the circle symbolizes the non--spiritual while the square symbolizes the spiritual. ",
    "c": "Vetruvian Man, as an attempt to fit the human body inside a circle and a square, reflects Leonardo's belief in God.",
    "d": "Vetruvian  Man is a statement of the metaphysical idea that the human body is a microcosm of the world",
    "correct": "D"
  },
  {
    "text": "Quantum cryptography is, in principle, a foolproof way to prevent hacking. It ensures that any attempt by an eavesdropper to read encoded communication data will lead to disturbances that can be detected by the legitimate users. Therefore, quantum cryptography allows the transmission of an unconditionally secure encryption key between two users, \"Alice\" and \"Bob\" in the presence of a potential hacker, \"Eve\". The encryption key is communicated using light signals and is received using photon detectors. The chalenge is that Eve can intercept signals. When light signals subvert the photon detectors, causing them to only see photons that Eve wants Bob to see",
    "a": "In quantum cryptography, the encryption ke transmitted with photon detectors and rec el\\ ed with light signals. ",
    "b": "Quantum cryptography uses light signals th can be captured and manipulated by a Would be hacker. ",
    "c": "Quantum hacking, in which light signals subvert photon detectors, is the least common form of hacking. ",
    "d": "If a hacker attempts to access data encoded with quantum cryptography, legal users have nc, way of knowing. ",
    "correct": "B"
  },
  {
    "text": "Consider the case of a bank headquartered in Italy, but with an important subsidiary in Germany. The German operations naturally generate a surplus of funds (given that savings in Germany far exceed investment on average). The parent bank would like to use these funds to reinforce the group's liquidity. But the German supervisory authorities consider Italy at risk and thus oppose any transfer of funds there. The supervisor of the home country (Italy) has the opposite interest. It would like to see the 'internal capital market' operate as much as possible. Here, too, it makes sense to have the European Central Bank (ECB) in charge as a neutral arbiter with respect to these opposing interests. Economic (and political) logic requires that the eurozone will soon also need a common bank rescue fund. Of fkially, this has not yet been acknowledged.\nBut that is often the way that European integration proceeds: an incomplete step in one area later requires further steps in related areas. (European Voice)",
    "a": "By settling banking disputes, the European Central Bank would bring stability to relations among eurozone member states.",
    "b": "The need for a shared bank rescue fund among eurozone member states has not yet been offi¬cially recognized.",
    "c": "Once established, a shared bank rescue fund will strengthen the eurozone both politically and economically.",
    "d": "The Gerfftan authorities support transferring funds to Italy, despite the risk involved.",
    "correct": "B"
  },
  {
    "text": "The Higgs boson is one of the final puzzle pieces required for a complete understanding of the standard model of physics - the so-far successful theory that explains how fundamental particles interact with the elementary forces of nature. The so-called God particle was proposed in the 1960s by Peter Higgs to explain why some particles, such as quarks - building blocks of protons, among other things - and electrons have mass, while others, such as the light¬carrying photon particle, do not. Higgs's idea was that the universe is bathed in an invisible field similar to a magnetic field. Every particle feels this field - now known as the Higgs field - but to varying degrees. If a particle can move through this field with little or no interaction, there will be no drag, and that particle will have little or no mass. Alternatively, if a particle interacts significantly with the Higgs field, it will have a higher mass. The idea of the Higgs field requires the acceptance of a related particle: the Higgs boson. tNational Geographic)",
    "a": "The Higgs boson helps explain why. in the standard model of physics, some particles have mass and others do not.",
    "b": "Accordino- to the Hiaggs theory a particle with high mass could travel through the Higgs field with few interactions.",
    "c": "Without the existence of the Higgs field, atoms. electrons, and chemical bonds would have difficult forming.",
    "d": "Higgs boson particles attach themselves to fundamental particles like quarks, electrons, and atoms, causing drag.",
    "correct": "A"
  },
  {
    "text": "When [Arthur Conan) Doyle graduated from Stonyhurst College in 1876, his parents expected that he would follow in his family's footsteps and study art, so they were surprised when he decided to pursue a medical degree at the University of Edinburgh instead. At medical school, Doyle met his mentor, Professor Dr. Joseph Bell, whose keen powers of observation would later inspire Doyle to create his famed fictional detective character, Sherlock Holmes. Doyle became increasingly invested in Spiritualism or \"Psychic religion,\" a belief system that he would later attempt to spread through a series of his written works. By the time he received his Bachelor of Medicine degree in 1881, Doyle had denounced his Roman Catholic faith. Doyle's first paying job as a doctor took the form of a medical officer's position aboard the steamship Mayumba, travelling from Liverpool to Africa. (biography.co1n)",
    "a": "Arthur Conan Doyle's renunciation of his Roman Catholic faith was largely due to the influence of his father.",
    "b": "Following family tradition, Arthur Conan Doyle studied art before he decided to pursue a medical degree.",
    "c": "The powerful observational skills of Sherlock Holmes were modeled on a doctor he met while aboard the Mavumba,",
    "d": "After receiving his medical degree, Doyle served as a medical officer on a steamship for his first paying position as a doctor.",
    "correct": "D"
  },
  {
    "text": "Warm-blooded birds need about 20 times more oxygen than cold-blooded reptiles, and they have evolved a unique lung structure that allows for a high rate of gas exchange and high activity level. Their unusual thigh complex helps support the lung and prevent its collapse. But the scientists said that every other animal - including humans, elephants, dogs, lizards and, in the ancient past, dinosaurs - that has walked on land has had a moveable thigh bone that was involved in the animal's motion. The implication of these facts, the researchers said, is that birds almost certainly did not descend from the ropod dinosaurs such as the tyrannosaurus or allosaurus. The scientists' findings add to a growing body of evidence in the past two decades that challenge some of the most widely held beliefs about animal evolution. (Science Daily)",
    "a": "Scientists have concluded that dinosaurs such as tyrannosaurus are probably not the ancient ancestors of birds.",
    "b": "Cold-blooded reptiles have a special structure in their lungs allowing them to exchange gases at a rapid rate.",
    "c": "Dinosaurs had a flexible thigh bone that allowed them to walk on land with more efficiency than elephants.",
    "d": "Birds were able to survive what likely killed the dinosaurs because their thigh complex prevented lung collapse.",
    "correct": "A"
  },
  {
    "text": "Van Gogh's art helped him stay emotionally balanced. In 1885, he began work on what is considered to be his first masterpiece, Potato Enters. His brother Theo, by this time living in Paris, believed the painting would not be well-received in the French capital, where impressionism had become the trend. Nevertheless,\nVan Gogh decided to move to Paris, and showed up at Theo's house uninvited. In Paris, Van Gogh first saw impressionist art, and he was inspired by the color and light. He began studying with Toulouse¬Lautrec, Pissarro and others. Van Gogh was passionate, and he argued with other painters about their works, alienating those who became tired of his bickering. In February 1888, Van Gogh boarded a train to the south of France. He moved into the \"little yellow house\" and spent his money on paint rather than food. He lived off of coffee, bread and absinthe, and found himself feeling sick and strange, even sipping turpentine and eating paint. (l1iogra111t y.com)",
    "a": "Despite Van Gogh's love of passionate argument, he maintained friendships with Pissarro, and other painters.",
    "b": "Van Gogh was emotionally volatile and had turbulent relationships with other painters throughout his life.",
    "c": "When Van Gogh first moved to Paris, he was introduced to impressionism and was inspired by the colour and light.",
    "d": "Despite his brother's initial skepticism, Van Gogh's first masterpiece, Potato Eaters, was well received in Paris.",
    "correct": "C"
  },
  {
    "text": "Until recently, black holes were thought to come in only two sizes: small stellar varieties that are several times heavier than our sun, and supermassive black holes that pack the gravitational punch of many millions of suns – large enough to swallow our entire solar system, Notorious for ripping apart and swallowing stars, extra-large black holes live exclusively in the hearts of most galaxies, including our own Milky Way. The new middleweight black hole is between these two types – equal to the matter of about 90,000 suns. Supermassive black holes might form when a single intermediately sized black hole gobbles enough matter to grow into a supermassive black hole with at least a million solar masses. Or perhaps a number of intermediate black holes merged in the early universe to form the supermassive black holes we see today. Either way, without further surveys, it's impossible to tell how common middleweight black holes are across the universe. (Nntio11al Geographic)",
    "a": "A supermassive black hole may have formed when a group of intermediate black holes merged in the early universe. ",
    "b": "Interrnediate black holes, equal to the matter of about 90,000 suns, are instrumental in the formation of solar systems.",
    "c": "Supermassive black holes live at the centre and outskirts of most galaxies, dismantling and consuming stars.",
    "d": "Based on existing research data, it is possible to forecast the number of intermediate black holes that exist in the universe.",
    "correct": "A"
  },
  {
    "text": "The International Monetary Fund on. Tuesday lowered its estimates for United States economic growth for this year and next and urged policy makers to do mora to help the housing sector and support the tepid recovery. In its annual assessment of the American economy, the fund also had a sharp warning for the U.S.: avoid the fiscal cliff at the end of the year, when the Bush-era tax cuts expire and mandatory spending cuts across the eove1·n111ent go into effect. The sudden shock could be enough to put the country back into recession, the fund warned with global repercussions. In a news conference. Christine Lagarde, the fund's managing director, also said that Congress should \"promptly raise the debt ceiling to avoid spooking the global debt markets and raising the country’s borrowing costs. The government is· expected to hit its statutory borrowing limit late this year. ",
    "a": "IMF estimates for US economic growth would not have been lowered had the ,country 's jobless rate shown improvement",
    "b": "According to the International Monetary Fund’s managing director the US should maintain the current debt ceiling. ",
    "c": "the IMF warned the US that government spending cuts could contribute to the country sinking back into recession",
    "d": "IMF estimates for US economic growth would not have been lowered had the country’s housing been stable",
    "correct": "C"
  },
  {
    "text": "Videogame technology is proving to be a valuable tool for helping people of all ages improve lifestyle and health habits and manage disease. New research is showing that so-called exergames\" significantly benefit older adults by providing them with cognitive stimulation and a source of social interaction. exercise, and fun. Thus, the games help lead them to fuller. more independent lives for a longer time.\nThe elderly often forsake their lifelong activities in exchange for the safety, security, and care of institutional living ,. says Editor-in-Chief Bill ferguson, PhD.\n'This trade-off need not require the sacrifice of physical activity and fitness. furthermore, videogames offer an escape from routine. All of these benefits can improve the well-being of elderly adults.\" Digital games offer a home-based method of supporting behavior modification, motivating patients to take better care of themselves and to self-manage chronic conditions. , Science Dail",
    "a": "According to Ben Ferguson the elderly must give up physical activity and fitness fir safety and security",
    "b": "Elderly adults living in assisted care facilities reap greater benefits from exergames do their peers living in their own homes ",
    "c": "Elderly adults who regularly use exergmes are more mentally healthy and more fulfilled socially than those who do not",
    "d": "Videogame technology can benefit the elderly by helping them to motivate them and manage some of their chronic conditions ",
    "correct": "D"
  },
  {
    "text": "Rene Lacoste's mechanical mind never really lagged behind his athletic pursuits. A tenacious perfectionist. he had once been criticized by a coach for overtraining. His tendency to wear out practice partners proved so frustrating that Lacoste created the world's first tennis ball machine. a hand-cranked device he called lance-balle: His inventive mind worked in areas outside at tennis. too. Between the mid-1960s and late 1980s Lacoste tiled 20 new patents. But a clothing line that bore his name proved to be Lacoste’s greatest post-game success. Asa player. Lacoste went against traditional on-court fashion, opting to compete in short-sleeved knit shirts rather than dress shirts. Sensing a market for this look, Lacoste formed a small company to manufacture the apparel soon after leaving the game. By 1950, Lacoste’s shirt, with its signature crocodile emblem on the left breast, entered the U.S. market. thiography.cont) ",
    "a": "Gifted tennis. mechanical engineering. and fashion design. Lacoste’s main passion was always invention",
    "b": "After his tennis career Lacoste’s greatest success was his invention ot the world’s first tennis ball machine. ",
    "c": "Lacoste was a perfectionist. quickly went through practice partners. and wore short-sleeved knit shirts on court. ",
    "d": "The Lacoste name and crocodile symbol conquered the US market and became status symbols in the world of fashion",
    "correct": "C"
  },
  {
    "text": "Cleopatra,s father had thrown in his lot 1,-ith Pompey the Great Good fortune seemed eternally to shine on Pompey, that brilliant Roman general, at least until Julius Caesar dealt him a crushing defeat in central Greece. Pompey fled to Egypt, ·where, in -IS BCr he was stab bed and decapitated. Twenty-one-year-old Cleopatra was at the time a fugitive in the Sinai - on the losing side of a civil\nwar against her brother and at the mercy of her brother's troops and advisers. Quickly, she managed to ingratiate herself with the new master of the Roman world, Julius Caesar. Caesar\narrived in Alexandria just days after Pompey's murder, He barricaded himself in the Ptolernies' palace, the home from which Cleopatra had been exiled. From the desert, Cleopatra engineered clandestine return, skirting enemy lines and Roman barricades, arriving after dark inside a sturdy sack. Over the succeeding months she stood at Caesar's ide - pregnant with his child - while he battled her brother's troops. With their defeat, Caesar restored her to the throne. ",
    "a": "After Caesar returned Cleopatra to the throne, she went on to rule the Mediterranean region for many years.",
    "b": "In 48 bc, the Roman general Pompey the Great escaped to Egypt, where he was stabbed and beheaded.",
    "c": "In 48 bc, the young  Cleopatra was living in the Sinai following a civil war victory against her brother.",
    "d": "The young Cleopatra was able to quickly win the favour of Julius Caesar. a new leader in the Roman world.",
    "correct": "D"
  },
  {
    "text": "George Frideric Handel's Messiah was, originally an Easter offering. It burst onto the stage of Musick Hall in Dublin on April 13, 1742. Handel's superstar status was not the only draw: many also came to glimpse the contralto, Susannah Cibber, then embroiled in a scandalous divorce. (Handel] was born in Halle, Germany, into a religious, affluent household. His father, Georg Handel, a celebrated surgeon in northern Germany, wanted his son to study the law. But an acquaintance, the Duke of Weissenfels, heard the prodigy, then barely 11, playing the organ. The nobleman's recognition of the boy's genius likely influenced the doctor's decision to allow his son to become a musician. By 18, Handel had composed his first opera, A/1nir11. During the next five years, he was employed as - a musician, composer and conductor at courts and churches in Rome, Florence, Naples and Venice, as well as in Germany, where the Elector of Hanover, the future King George I of England, was briefly his patron.",
    "a": "A Handel was born into a religious family, the son of a successful surgeon who wanted him to study law. ",
    "b": "Handel mostly preferred to work for one or two main benefactors, rather than seeking patronage more widely.",
    "c": "On its opening night of April 13, 1742• the Messiah drew crowds solely because of Flanders dazzling reputation. ",
    "d": "Contralto Susannah Cibber drew crowds not because of her voice but because of the scandalous divorce she was going through. ",
    "correct": "A"
  },
  {
    "text": "Suzanne de la Monte, M.D., has found a link between brain insulin resistance (diabetes) and two other key mediators of neuronal injury that help Alzheimer's disease IAD) to propagate. The research found that once AD is established, therapeutic efforts must also work to reduce toxin production in the brain. Alzheimer's disease is one of the most common degenerative dementias, and more than 115 million new cases are projected worldwide in the nest 40 years. There is clinical and experimental evidence that treatment with insulin or insulin sensitizer agents can enhance cognitive function and in some circumstances help slow the rate of cognitive decline in AD. Alzheimer's and other neurodegenerative diseases destroy the brain until the patients finally succumb. In order to effectively halt the process of neurodegeneration, the forces that advance and perpetuate the disease, particularly with regard to the progressive worsening of brain insulin/ ICE resistance, must be understood. (Science Daily) ",
    "a": "The underlying causes of brain insulin resistance (diabetes) and Alzheimer's disease are almost identical. ",
    "b": "If Alzheimer's disease is diagnosed early, the rate of neurodegeneration can likely be decreased effectively",
    "c": "Clinical and experimental evidence suggests that insuIin treatment· can improve cognitive function in Alzhlainer's patients.",
    "d": "Alzhainer's disease ls the most common degenerative dementia and more than :115 million new cases are projected worldwide in the next 40 years.",
    "correct": "C"
  },
  {
    "text": "A painter, sculptor, printmaker, ceramist and writer, Gauguin stands today as one of the giants of Post-Impressionism and a pioneer of Modernism. He was also a great storyteller, creating narratives in every medium he touched. Some of his tales were true, others near-fabrications. For instance, the lush Tahitian masterpieces for which he is best known reflect an exotic paradise more imaginary than real. The fables Gauguin spun were meant to promote himself and his art, an intention that was more successful with the man than his work; he was well known during his lifetime, but his paintings sold poorly. Certainly the artist would have been pleased by the renewed attention; his goal, after all, was to be famous. He dressed bizarrely, wrote self-serving critiques of his work, courted the press and even handed out photographs of himself to his fans. He was often drunk, belligerent and promiscuous - and possibly suicidal. (smithsonianmag.com)",
    "a": "Gauguin's Tahitian masterpieces provide a remarkably accurate and detailed record of the lush tropical environment.",
    "b": "Gauguin used his gift for telling stories to please his friends and fans and to advance the cause of art in general.",
    "c": "Along with painting, Gauguin spent time drinking, promoting himself, telling stories, and engaging in sexual relations.",
    "d": "Gauguin never made much money selling his paintings because of his strange and provoking behaviour with the press and the public.",
    "correct": "C"
  },
  {
    "text": "When cats are on what they perceive to be safe ground they can and do behave affectionately towards their owners. They show this in a whole variety of ways including: raising their tails upright when they see us, rubbing their heads or flanks on our legs, licking us when they're sitting next to us, and purring when we stroke them. How do we know that these are signs of affection? Well, it has to be said that we will never know precisely what's going on inside a cat's head (or a dog's for that matter), but we do know that these are the ways in which cats indicate their affection for other cats. The fact that cats get along with other cats at all is something of an achievement for a species that was exclusively solitary just 10,000 years ago. Our domestic cat's wild relatives, the Arabian wildcat Felis lybica, spend most of their lives alone. During the breeding season, males consort with females for just a few days of the year, but otherwise avoid other cats as much as possible, unlike male lions and cheetahs, both of which are able to form \"brotherhoods\", competing with other groups for the attention of females. (theguardian.com)",
    "a": "Male lions and cheetahs are similar to domestic cats in that they have evolved over the years to have specific behavioral tendencies towards one another.",
    "b": "10,000 years ago the Arabian wildcat Pelis lybica spent most of its time alone until the breeding season meant it sought out a mate with which to breed.",
    "c": "It is not possible to know precisely what goes on in the mind of a cat but we can make assumptions by observing their behavior.",
    "d": "Unlike lions and cheetahs the Pelis lybica form groups, which allow them to compete effectively with big cats for the attention of females.",
    "correct": "C"
  },
  {
    "text": "A staggering 320 tons of gold and more than 7,500 tons of silver are now used annually to make PCs, cell phones, tablet computers and other new electronic and electrical products worldwide, adding more than $21 billion in value each year to the rich fortunes in metals eventually available through \"urban mining\" of e-waste, experts say. Quantities of gold, silver and other precious metals available for recovery are rising in tandem with the fast-growing sales of electronic and electrical goods, including the new category of tablet computers (with 100 million in estimated unit sales this year, a figure expected to almost double in 2014). Thanks to the volume and value of precious metals it contains, the percentage of e-waste collected in developing countries is estimated to be as high as 80- 90% in countries with an active informal recycling sector. (Science Daily)",
    "a": "Sales of tablet computers are growing very quickly and are expected to almost triple in the year 2014.",
    "b": "The 30 manufacturing countries use 320 tons of gold and 7,500 tons of silver annually between them to make new electronic and electrical products.",
    "c": "Without more sustainable recovery of e-waste metals, the current rate of electronic production could suffer.",
    "d": "More than $21 billion in precious metals including gold and silver could be recovered each year through mining e-waste.",
    "correct": "D"
  },
  {
    "text": "Morse gave up painting entirely; relinquishing the whole career he had\nset his heart on since college days. No one could dissuade him. He had to attend to one thing at a time, as his father had long ago advised him. The \"one thing\" henceforth would be his telegraph, the crude apparatus that was housed in his New York University studio apartment. Later it would be surmised that, had Morse not stopped painting when he did, no successful electromagnetic telegraph would have been developed when it was, or at least not a Morse electromagnetic telegraph. Essential to Morse's idea, as he had set forth earlier in notes written in 1832, was that signals would be sent by the opening and dosing of an electrical circuit, that the receiving apparatus would, by electromagnet, record signals as dots and dashes on paper, and that there would be a code whereby the dots and dashes would be translated into numbers and letters. (smithsonianmag. com)",
    "a": "Morse made many attempts to develop a code for his telegraph before finding one that worked.",
    "b": "Morse planned for telegraph signals to be sent by the opening and closing of an electrical circuit and recorded by electromagnet.",
    "c": "Morse pursued the design of his electromagnetic telegraph even as he was working as a commissioned painter.",
    "d": "Although his telegraph was not immediately successful, Morse continued to refine his invention, undeterred.",
    "correct": "B"
  },
  {
    "text": "Peat wetlands in northwest Europe are well-known for their bog bodies. The wetlands provide cold, acidic, oxygen¬free conditions, which prevent decay and mummify human flesh. The two\nnew Irish bog men were named after the places where they were found: Croghan Hill and Clonycavan. Oldcroghan\nman was preserved so perfectly that\nhis discovery sparked a police murder investigation before archaeologists were called in. Radiocarbon dating showed that he lived between 362 BC and 175 BC, while Clonycavan man dates from 392\nBC to 201 BC. A team led by researchers at the National Museum of Ireland studied the two bodies. The scientists say the fingerprint whorls of Oldcroghan man are as clear as any living person's. While both bog men appeared to be aristocratic dandies of their day, they still met horrible deaths. Oldcroghan man shows signs of cruel torture before he was beheaded. Meanwhile, Clonycavan man suffered three axe blows to the head, plus one to his chest. (National Geographic)",
    "a": "The two new Irish bog bodies show signs of torture, indicating that they were killed as part of a ritual to pagan gods.",
    "b": "The two bodies were found preserved in the cold, acidic conditions of the bogs Croghan Hill and Clonycavan.",
    "c": "The two bog bodies were apparently men of low social rank, which may explain why they were buried in the bog.",
    "d": "Oldcroghan man and Clonycavan man offer evidence of Iron Age burial modes occurring across Western Europe and beyond.",
    "correct": "B"
  },
  {
    "text": "Scientists have long known that the body rids itself of excess copper and various other minerals by collecting them in the liver and excreting them through the liver's bile. However, a new study suggests that when this route is impaired, there's another exit route just for copper: a molecule sequesters only the copper and routes it from the body through urine. The researchers found this additional copper escape hatch by studying an animal model of Wilson's disease, a rare disorder most often diagnosed in children. People with this disease accumulate abnormally large amounts of copper in the liver, eventually leading to liver damage and failure. Micronutrients such as copper, zinc and iron are indispensable for human development. Copper is required for embryonic development, respiration, and cardiovascular function, among other processes; too little copper can be fatal whereas too much can cause neurological impairment and organ failure. (Science Daily)",
    "a": "Individuals with Wilson's disease were either over or under exposed to the micronutrient copper before birth.",
    "b": "In individuals with Wilson's disease, liver cells die off at increasingly rapid rates without regenerating.",
    "c": "Too much of the micronutrient copper leads to death, but too little leads to neurological damage rather than death.",
    "d": "Collection in the liver and excretion through the liver's bile is just one way that excess copper exits the body.",
    "correct": "D"
  },
  {
    "text": "In 2001, the Human Genome Project and Celera Genomics announced that after 10 years of work at a cost of some $400 million, they had completed a draft sequence of the human genome. Today, sequencing a human genome is something that a single researcher can do in a couple of weeks for less than $10,000. Since 2002, the rate at which genomes can be sequenced has been doubling every £our months or so, whereas computing power doubles only every 18 months. Without the advent of new analytic tools, biologists' ability to generate genomic data will soon outstrip their ability to do anything useful with it. Researchers talk about a new algorithm that drastically reduces the time it takes to find a particular gene sequence in a database of genomes. And in fact, the more genomes the algorithm searches, the greater the speed up it affords, so its advantages will only compound as more data is generated. (Science Daily)",
    "a": "A lone scientist is able to sequence a human genome over the course of a few weeks for less than $10,000.",
    "b": "Celera Genomics finished a draft sequence of the human genome after 10 years of work for less than $10,000.",
    "c": "The new algorithm reduces the time it takes to locate a gene sequence by utilizing related species' genomes.",
    "d": "Since 2002 the rate at which scientists can sequence genomes has doubled.",
    "correct": "A"
  },
  {
    "text": "Since they became widely known in the late 1920s, the mysterious desert drawings known as the Nasca lines have puzzled archaeologists, anthropologists, and anyone fascinated by ancient cultures in the Americas. For just as long, waves of scientists - and amateurs - have inflicted various interpretations on the lines, as if they were the world's largest set of Rorschach inkblots. At one time or another, they have either been explained as Inca roads, irrigation plans, images to be appreciated from primitive hot-air balloons, or, most laughably, landing strips for alien spacecraft. Almost all of these iconic animal figures, such as the spider and the hummingbird, were single-line drawings; a person could step into them at one point and exit at another without ever crossing a line, suggesting to archaeologists that at some point in early Nasca times the lines evolved from mere images to pathways for ceremonial processions. (National Geographic)",
    "a": "Since the 1920s due to the influence of popular culture, amateurs proposed that the Nasca lines were alien spacecraft landing strips.",
    "b": "Recently scientists have proved that the Nasca lines were initially images that evolved into ceremonial pathways.",
    "c": "Inca roads, irrigation plans, and landing strips are three interpretations of the single-line Nasca drawings",
    "d": "The Nasca lines, including the spider and hummingbird, always served the dual purpose of irrigation and ceremony.",
    "correct": "C"
  },
  {
    "text": "Italy managed to borrow in the financial markets at slightly lower rates Friday, despite a downgrade of its sovereign debt by a credit rating agency that threatened to deal a new blow to its efforts to escape the debt crisis. The Italian Treasury sold out its offering of €5.25 billion, or $6.4 billion, with three-year government bonds at 4.65 per cent, the lowest rate since May but still at a high price by historical standards. Moody's Investors Service lowered Italy's government bond rating Friday by two steps to Baa2 from A3, citing concerns that Italy faces higher financing costs and an increased risk of being locked out of lending markets as it battles contagion emanating from Greece and Spain. Nicholas Spiro, managing director of Spiro Sovereign Strategy, a London based consultancy specializing in sovereign credit risk, described the Italian auction as a \"mixed bag\" but called the outcome more positive than negative. (New York Times) ",
    "a": "Moody's Investors Service downgraded Italy's government bond rating because of the country's unsuccessful efforts to escape the debt crisis. ",
    "b": "Despite the auction, the stakes for Italy remain high because the country is too big (or the euro lone to bail out. ",
    "c": "The Italian Treasury sold three-year government bonds at per cent, a price that is high by historical standards. ",
    "d": "Italy may become caught in a downward cycle, with recessionary trends adding an unsustain-able debt burden.",
    "correct": "C"
  },
  {
    "text": "Nothing about elephants is small, and their pregnancies are no exception. Before giving birth to a 110-kilogramme calf, mothers carry the foetus for 22 months, the longest gestation period of any mammal. And whereas most mammals have only one corpus luteum -a temporary gland that controls hormone levels during pregnancy - elephants have as many as 11. Now, by giving 17 elephants blood tests and ultrasound scans throughout their pregnancies, researchers have discovered a key to this remarkable form of motherhood. The researchers found that the animals formed, on average, live corpora lute.' during each menstrual cycle. And surprisingly, whereas one corpus luteum WAN derived from an egg-generating follicle, as happens in mammals such as humans, the rest of the structures formed I rum separate follicles at a different point in the reproductive cycle. The observation could lead to methods for controlling elephant ovulation or timing artificial insemination. (scirocetnag.org)",
    "a": "Young female elephants that have not vet reached sexual maturity are not able to develop multiple corpora lutes. ",
    "b": "Multiple corpora lute.; lotin from separate follicles in female elephants in order to maintain steady hormone levels, ",
    "c": "Female elephants form about five corpora lutes during each menstrual cycle, all from one egg-generating follicle.",
    "d": "Elephant mother carry foetus for 22 months which is the longest gestation period among mammal. ",
    "correct": "D"
  },
  {
    "text": "Physicists are often interested in mathenialically describing how a system behaves: for instance, a (UMW/ tracks the motions of the planets and their moons in their complicated dance around the sun. Keseerchens work. nut these equations by measuring the objects at various points In lime and then developing a formula that links all of those points together, such as filling In  video from a set of snapshots. With each new variable, however, It becomes tougher to find the right equation. Computes,' can speed things up by silting through potential solutions at breakneck speed. but even the world's top supercomputers meet their match with • certain clan of problems. known as \"hard\" problem+. These problems take exponentially more time to solve with every additional variable that is thrown into the mix - an extra planet's motion, for Instance. Isciencernagorg) ",
    "a": "With each variable that is added. so-callled \"hard' problems take exponentially more time to solve, even for computer,",
    "b": "As researchers work to describe a system mathematically  each variable makes it easier to find correct equation. ",
    "c": "Problems considered -hard' can still be solved at breakneck speed by the best supercomputer or the world ",
    "d": "Any algorithm that turns data into a formula describing a system over time can't be simplified to run on a computer",
    "correct": "A"
  },
  {
    "text": "This new, Irrational art movement would he named Dada. It got its name, according to Richard Huelsenbeck, a German artist Iiving in Zurich, when he and Ball came upon the word in a French. German dictionary. In Ball, it lit. \"Dada Is 'yes, yes In Rumanian, 'rocking horse' and 'hobby hone in French.\" he noted in his diary. For Germans It Is a sign of brutish naiveté, joy in procreation, and preoccupation with the baby carriage: Romanian artist Tristan Tiara, who later claimed that he had coined the term, quickly used it on posters, put out the first Dada journal and wrote one of the lint of many Dada manifestoes, few of which made much sense. But the absurdist outlook spread like a pandemic -Tzara called Dada \"'a virgin microbe\" and there were outbreaks from Berlin to Paris, New York and even Tokyo. And for all its zaniness, the movement would prove to be one of the most influential in modern art, foreshadowing abstract and conceptual art, performance art, or, pop and installation art. (smithsonianmag. com)",
    "a": "The irrational art movement of Dada appealed particularly to those who could not make sense of the events of the early 20th century.",
    "b": "The first of many Dada manifestoes, issued by Romanian artist Tristan Tzara, were all highly logical and meaningful.",
    "c": "The term \"dada\" means \"hobby horse\" in French and for Germans it has associations with joy in procreation.",
    "d": "The element of Dada that paved the way for abstract and conceptual art was its absurdity and irrationality.",
    "correct": "C"
  },
  {
    "text": "As China's leaders have been preoccupied with a political struggle leading up to a once-in-a-decade leadership change this autumn, there are increasing signs that the Chinese economy may be running into trouble. China announced Thursday that growth in imports had unexpectedly come to a screeching halt in April - rising just 0.3 per cent from the same period a year earlier, compared with expectations for an 11 per cent increase. Businesses across the country appeared to lose much of their appetite for products as varied as iron ore and computer chips. China has been the largest single contributor to global economic growth in recent years, and a sustained slowdown in its economy could pose problems for many other countries. Particularly exposed are countries that export commodities like iron ore and oil and rely on demand from China's steel mills and ever-growing ranks of car owners. (New York Times)",
    "a": "In recent years, China has contributed less to worldwide economic expansion than a few other countries.",
    "b": "If China experiences a prolonged economic slowdown the impact will be confined to countries in Asia and Europe.",
    "c": "Chinese imports rose 0.3 per cent compared to the same period the previous year when an 11 per cent rise had been expected.",
    "d": "Many private sector companies in China have been asking their suppliers for more time to pay bills and debts.",
    "correct": "C"
  },
  {
    "text": "In 1565, ambitious for the English throne, Mary Queen of Scots married her cousin, Henry Stewart, Lord Darnley, a grandson of Margaret Tudor, but became disgusted by his debauchery, and was soon alienated from him. The birth of a son, the future James VI, failed to bring a reconciliation. While ill with smallpox, Darnley was mysteriously killed in an explosion at Kirk o' Field (1567); the chief suspect was the Earl of Bothwell, who underwent a mock trial and was acquitted. Mary's involvement is unclear, but she consented to marry James Hepburn of Bothwell, a divorce with whom she had become infatuated. The Protestant nobles under Morton rose against her; she surrendered at Carberry Hill, was imprisoned at Loch Leven, and compelled to abdicate in favour of her son James VI. After escaping, she raised an army, but was defeated again by the confederate lords at Langside (1568). Placing herself under the protection of Queen Elizabeth, she found herself instead a prisoner for life. (biography.com)",
    "a": "Mary Queen of Scots married James Hepburn of Bothwell with whom she had a son, the future James VI.",
    "b": "In 1567 Mary's husband, Lord Darnley, was in strange circumstances killed in an explosion while sick with smallpox.",
    "c": "Queen Elizabeth I had Mary arrested and imprisoned because she saw her as a serious threat to the throne.",
    "d": "After gathering an army, Mary Queen of Scots successfully defeated the confederate lords at Landside in 1568.",
    "correct": "B"
  },
  {
    "text": "Neurosurgeons and researchers are adapting an ultraviolet camera to possibly bring planet-exploring technology into the operating room. If the system works when focused on brain tissue, it could give surgeons a real-time view of changes invisible to the naked eye and unapparent even with the magnification of current medical imaging technologies. The pilot study seeks to determine if the camera provides visual detail that might help surgeons distinguish areas of healthy brain from deadly tumors called gliomas1 which have irregular borders as they spread into normal tissue. Because tumor cells are more active and require more energy than normal cells, a specific chemical (nicotinamide adenine dinucleotide hydrogenase or NA.OH accumulates in tumor cells but not in healthy cells. NA.OH emits ultraviolet, light that may be captured by the camera and displayed in a high-resolution image. The camera employs the ultraviolet technology used in space to study planets and distant galaxies. (Science Dail)",
    "a": "Neurosurgeons do not use images taken by the ultraviolet camera in making decisions or to aid surgical technique.",
    "b": "Healthy cells require more energy than tumor cells and typically display irregular borders as they grow.",
    "c": "The ultraviolet camera will revolutionize how brain tumors and other neurological disorders are treated.",
    "d": "Ultraviolet technology used to study galaxies and planets could be adapted for the benefit of neurosurgery.",
    "correct": "D"
  },
  {
    "text": "It was hailed in 2010 as the most \"alien\" life-form yet: bacteria that reportedly, and unprecedentedly, had rewritten the recipe for DNA. And the secret ingredient was arsenic. Researchers led by then NASA astrobiologist Felisa Wolfe-Simon had found the organism, dubbed GFAJ-1, in arsenic-rich sediments of California's Mono Lake. They later reported that the bacterium thrived in arsenic-rich, phosphorus-poor lab conditions. The team concluded that GFAJ-1 must be incorporating arsenic into its DNA in place of phosphorous, which is essential for the DNA of all other known organisms. The find was exciting to astrobiologists, who had previously speculated that extraterrestrial life might survive in unexpected places if only such a swap were possible - arsenic and phosphorous being chemically similar. But when the amount of phosphorous was reduced even further than in Wolfe-Simon’s experiments, GFAJ-1 stalled. The new conclusion: the arsenic loving  life-form does in fact need phosphorous to grow,. but shockingly tiny amounts of it. ",
    "a": "Wolfe-Simon and her team concluded that GFAJ-1 was able to incorporate hosphorous into its DNA in place of arsenic. ",
    "b": "Wolfe-Simon and her team found the GFAJ-1 organism in sediments of Mono Lake. ",
    "c": "GFAJ-1's ability to exchange phosphorous and arsenic would confirm the existence of extraterrestrial life ",
    "d": "The fact that GFAJ-1 requires miniscule amounts of phosphorous for growth confirms the extraterrestrial life hypothesis.",
    "correct": "B"
  },
  {
    "text": "By the time Paul Morphy was felled by a stroke on Julv 10, 1884, he had become an odd but familiar presence on Canal Street in New Orleans: a trim little man in sack suit and monocle, muttering to himself, smiling at his own conceits, swinging his cane at most who dared approach. Sometimes he would take a fancy to a passing woman, following her for hours at a distance. He lived in fear of being poisoned, eating only food prepared by his mother or sister, and he believed that neighbourhood barbers were conspiring to slit his throat. His family tried to have him committed to an asylum, but he argued his sanity so convincingly that the authorities declined to admit him. It had been a quarter-century since he became a world-renowned chess champion, and for the last decade of his life he was loath to discuss the game at all.",
    "a": "Morphv's obsessions and paranoia, which bordered on madness, were probably the necessary counterpart to his genius.",
    "b": "Morphy wore a monocle, believed that barbers would cut his throat and ate only food that his family prepared.",
    "c": "In his later years, Morphy came to believe that time spent playing chess was nothing more than wasted time.",
    "d": "Morphy's behaviour eventually became so disturbing that his family had him committed to a mental asylum.",
    "correct": "B"
  },
  {
    "text": "Research shows a twentyfold enhancement in harvesting light by combining graphene with metallic nanostructures, and this new discovery could pave the way for advances in high speed internet and other communications. By putting two closely spaced metallic wires on top of graphene and shining light on this structure, researchers generated electric power. This simple device is actually an elementary solar cell. Such graphene devices can transfer data tens and potentially hundreds of times faster than communication rates in the fastest internet cables; this is due to the uniquely high mobility and velocity of electrons in graphene. But the major stumbling block towards practical applications of these otherwise promising devices has been their low efficiency. The problem is that graphene - the thin nest material in the world - absorbs little light, approximately only 3 per cent of the total light shined on it, while the rest penetrates the graphene without contributing to the generation of electrical power. (Science Daily)",
    "a": "Graphene devices can transfer data so fast that they will replace existing internet cables.",
    "b": "A graphene solar cell can be made only by placing graphene on top of a metallic wire and then shining light on it.",
    "c": "Graphene devices owe their incredible speed to the high mobility and velocity of graphene's electrons.",
    "d": "Graphene devices are promising to communications because of their high efficiency and lightning speed.",
    "correct": "C"
  },
  {
    "text": "Shrapnel from mortars, grenades and, above all, artillery projectile bombs, or shells, would account for an estimated 60 percent of the 9.7 million military fatalities of World War I. And it was soon observed that many soldiers arriving at the casualty clearing stations who had been exposed to exploding shells, although clearly damaged, bore no visible wounds. Rather, they appeared to be suffering from a remarkable state of shock caused by blast force. This new type of injury, a British medical report concluded, appeared to be \"the result of the actual explosion itself, and not merely of the missiles set in motion by it.\" In other words, it appeared that some dark, invisible force had in fact passed through the air and was inflicting novel and peculiar damage to men's brains. \"Shell shock,\" the term that would come to define the phenomenon, first appeared in the British medical journal The Lancet in February 1915, only six months after the commencement of the war. (smithsonian1nag.co1n)",
    "a": "Shell shock causes no visible wounding but those who suffer from the condition display symptoms similar to a concussion.",
    "b": "From early in World War l, soldiers appeared at casualty clearing stations suffering from an unusual state of shock.",
    "c": "The term \"shell shock\" was coined by military doctors in the barracks before appearing in the February 1915 edition of The Lancet.",
    "d": "About 60 percent of the 9.7 million World War l military deaths were due to what would become known as shell shock.",
    "correct": "B"
  },
  {
    "text": "The Cyprus presidency of the European Union began just days after European heads of state and government met in Brussels for what was billed as the latest make-or-break summit on the future of the euro. The decisions taken by political leaders at the meeting, the \"European Council,\" marked a defining moment for European integration, the first steps towards ever closer cooperation and co-ordination between not just the eurozone countries but the EU as a whole. While the decisions taken at the 28-29 June summit will help bring long term stability to the eurozone and the wider EU economy, the short-term need to stimulate growth and create jobs remains. At the summit, the Commission's country-specific recommendations on how to accelerate the Europe 2020 Strategy for jobs and growth were endorsed by EU leaders. Each country has to take the - sometimes difficult - decision to invest more in reforms and programmes designed to stimulate growth and counterbalance austerity measures and cuts. (European Voice)",
    "a": "At the summit, participating countries made decisions to support lasting stability: however, some short-term issues have not been resolved.",
    "b": "Higher levels of co-operation among the eurozone nations and EU will bring about political change.",
    "c": "At the summit, participating countries made critical decisions to increase cuts and austerity measures.",
    "d": "In the future, more money will be devoted to stimulating growth and creating jobs.",
    "correct": "A"
  },
  {
    "text": "From the Middle Ages to the Baroque period, tapestry enjoyed a prestige far beyond that of painting. Royalty an? the church commissioned whole senes of designs - called cartoons - from the most sought-after artists of their times: Raphael, Rubens, Le Brun. Later artists from Goya to Picasso and Miro and beyond have carried on the tradition. Still, by 20th-century lights, tapestries fit more naturally into the pigeonhole of crafts than of fine arts. In their Golden Age, however, tapestries were seen to offer many advantages. They are portable, for one thing, as frescoes and wall paintings on a similar scale are not. For another, tapestries helped take the edge off the cold in large, drafty spaces. They had snob appeal, since only the richest of the rich could afford them. To hang tapestries was to show that you not only could appreciate the very best but that cost was no object. The materials alone could be worth a fortune, not to mention the massive costs of scarce, highly skilled labour. (smithsonianmag.com)",
    "a": "During their Golden Age, tapestry cartoons could be licensed and woven in multiples by different artists.",
    "b": "After the 18t~ century, there was a great decline in the creation of tapestries as oil painting became in vogue.",
    "c": "Tapestry was associated with the peasant classes during the Middle Ages through the Baroque period.",
    "d": "Tapestries were favoured at one time for their convenience, ability to block cold air, and role as status symbols.",
    "correct": "D"
  },
  {
    "text": "An interesting pattern over the last four decades is that inequality has grown much faster for households with children than it has for households over all - an indication that changes in family structure (as opposed to wages and employment alone) have increased inequality. Bruce Western and Tracey Shollenberger of the Harvard sociology department compared households at the 90th percentile and the 10th percentile. In 1970, the top households had 8.9 times the income of the bottom. By 2011 they had nearly 11.7 times as much- inequality between them grew 31 per cent. But among households with children it grew 121 per cent - the ratio went from 4.8 in 1970 to 10.6 last year. Most of that growth, it should be noted, occurred by 1994, while births to unwed mothers have continued to rise. And though no one has suggested that it is the sole or even main driving force behind the increases in inequality, rates of single parenthood are important but sometimes overlooked. (New York Times)",
    "a": "Children raised in single-parent households have more difficulty moving up the income ladder than their peers.",
    "b": "Single parenthood could be an important factor in inequality, and it's one that can also be ignored or missed.",
    "c": "A pattern emerging over the last forty years suggests that inequality has increased due only to wages and unemployment.",
    "d": "Between 1970 and 2011, income inequality between the top and bottom households grew by 121 per cent overall.",
    "correct": "B"
  },
  {
    "text": "In 1956, Mandela and 150 others were arrested and charged with treason for their political advocacy, though they were eventually acquitted. Meanwhile, the African National Congress (ANC) was being challenged by the Africanists, a new breed of Black activists who believed that the pacifist method of the ANC was ineffective. In 1961, Mandela, who was formerly committed to non-violent protest, began to believe that armed struggle was the only way to achieve change. He co-founded Umkhonto we Sizwe, also known as MK, an armed offshoot of the ANC dedicated to sabotage and guerilla war tactics to end apartheid. He orchestrated a three-day national workers strike in 1961 for which he was arrested in 1962. He was sentenced to five years in prison for the strike, and then he was brought to trial again in 1963. This time, he and 10 other ANC leaders were sentenced to life imprisonment for political offences, including sabotage. (biography.cam)",
    "a": "Mandela first began to consider guerilla war tactics shortly after he was arrested and charged with treason in 1956.",
    "b": "Umkhonto we Sizwe changed its pacifist tactics after Mandela was put on trial.",
    "c": "Mandela was arrested in 1962 and later sentenced to life imprisonment for sabotage and other political crimes.",
    "d": "The Africanist Black activists accepted the leadership role of the African National Congress and its pacifist method.",
    "correct": "C"
  },
  {
    "text": "For centuries, scientists have tried to solve the mystery of how the colossal stone statues of Easter Island moved. The multi-ton behemoths travelled up to 18 kilometres from the quarry where most of them were carved, without the benefit of wheels, cranes, or even large animals. Scientists have tested many ideas in the past, figuring that the islanders must have used a combination of log rollers, ropes, and wooden sledges. Now a pair of archaeologists have come up with a new theory: Perhaps the statues, known as moai, were \"engineered to move\" upright in a rocking motion, using only manpower and rope. Last year, Hunt and Lipo showed that as few as 18 people could, with three strong ropes and a bit of practice, easily and relatively quickly manoeuvre a three-meter, five-ton moai replica a few hundred meters. No logs were required. (National Geographic)",
    "a": "Islanders designed the moai specifically so the statues could be moved using rope and a rocking motion.",
    "b": "Islanders used wheels, cranes, and strong animals to move the stone statues from the quarry.",
    "c": "All of the stones were carved at a rock quarry and then moved 18 kilometers to their resting places.",
    "d": "As few as 18 islanders could have moved the stone statues with three ropes using a rocking motion.",
    "correct": "D"
  },
  {
    "text": "The Thames has been synonymous with rowing for almost three centuries. In August 1715, half a dozen \"watermen\" - oarsmen who ferried passengers on the river - convened beneath London Bridge for Britain's first rowing race. Nearly 200 years later, at the London Summer Olympic Games in 1908, spectators thronged the banks of Henley-on¬Thames, site of the annual Royal Regatta, as British scullers competed against crews from seven countries, including Canada, Hungary and the Netherlands. Eton College, the nearly 600-year-old prep school whose graduates include novelist Ian Fleming, Prime Minister David Cameron and Prince William, is famed for its fanatic devotion to rowing. Dozens of Etonians have gone on to row in the Olympics, including four-time gold medalist Sir Matthew Pinsent, now 42. Before the 1990s, Eton's crews practiced and competed on the Thames, but today recreational boat traffic makes rowing there too dangerous. (smithsonianmag. com)",
    "a": "Britain's first rowing race took place in 1715 with six watermen gathering on the Thames beneath London Bridge.",
    "b": "Etonians have rowed in the Olympics, and students of the College continue to row on the Thames even today.",
    "c": "Olympic boating events are no longer held on the Thames due to varying currents that would cause unfair conditions.",
    "d": "At the London Summer Olympics in 1908, the British crew was more successful than those of Canada and the Netherlands.",
    "correct": "A"
  },
  {
    "text": "Although previous studies like the one conducted by Buff ardi and Campbell showed Facebook and narcissism are linked, McKinney noted that, with the rise in popularity of social networking sites, the standard for narcissistic behaviour might be evolving. He said considering the recent mainstreaming of social media usage, the 2008 report may be dated in documenting the behaviour of those using social networking sites to post and share information. He noted that social media is now employed by not only individuals, but also by businesses and private institutions, and that this expansion paired with more pervasive use of social media may have changed the standards and purpose of the sites in the last five years. McKinney's study focused on the narcissistic traits exhibited by social media users rather than The Diagnostic and Statistical Manual of Mental Disorders (DSM) definition of Narcissistic Personality Disorder. lie said he plans to expand his research on the topic in the future. (Science Daily) ",
    "a": "McKinney's study on social media and narcissism applied the DSM definition of Narcissistic Personality Disorder. ",
    "b": "Along with individuals, businesses and organizations now use social media, which may be influencing the development strategies of these sites. ",
    "c": "McKinney's study shows conclusively that social media usage trends have stayed the same over the last five years. ",
    "d": "Individuals who use social media extensively are twice as likely to exhibit narcissistic traits as those who don't.",
    "correct": "B"
  },
  {
    "text": "Researchers used data from the UK's census to examine how health varied across the country, finding that people were more likely to have good health the closer they live to the sea. The analysis also showed that the link between living near the coast and good health was strongest in the most economically deprived communities. The results show that on average, populations living by the sea report rates of good health more than similar populations living inland. The authors were keen to point out that although this effect is relatively small, when applied to the whole population the impacts on public health could be substantial. Along with other studies the results of this work suggest that access to 'good' environments may have a role in reducing inequality in health between the wealthiest and poorest members of society. (Science Daily) ",
    "a": "In the UK, living further inland affords higher health benefits than living by the coast. ",
    "b": "Researchers believe that some of the features and benefits of living by the sea can be transferred to other locations. ",
    "c": "Living near the coast confers good health because it offers stress reduction and cleaner air compared to inland locations.",
    "d": "In the UK, the connection between living near the sea and good health was found to be strongest for the poorest people. ",
    "correct": "D"
  },
  {
    "text": "Painter, provocateur, risk taker and revolutionary, Gustave Courbet might well have said, \"I offend; therefore I am.\" Arguably modern art's original enfant terrible, he had a lust for controversy that makes the careers of more recent shockmeisters like Jeff Koons, Damien Hirst and Robert Mapplethorpe seem almost conventional. As a rebellious teenager from a small town in eastern France, Cou diet disregarded his parents' desire for him to study law and vowed, he wrote, \"to lead the life of a savage\" and free himself from governments. He did not mellow with age, disdaining royal honours, turning out confrontational, even making salacious canvases and attacking established social values when others of his generation were settling into lives cushioned with awards and pensions. As the standard-bearer of a new \"realism,\" which he defined as the representation of familiar things as they arc, he would become one of the most innovative and influential painters of mid-19th-century France. (stnitlisoniatimag.com)",
    "a": "Although Courbet originally stated his intent to live the life of a savage, he softened consider-ably in his later years. ",
    "b": "Courtiers rebellious spirit and corresponding vision were precisely what made him such a brilliant modern artist. ",
    "c": "Courbet's sometimes salacious paMtings were intended to change the public's taste and way 01 seeing. ",
    "d": "Courbet rejected his parents' wish that he study law, instead becoming a key figure of new realism in modern art. ",
    "correct": "D"
  },
  {
    "text": "John Gotti, born in the Bronx on October 27, 1940, was the Boss of the New York City Gambino crime family. lie was known for his outspoken personality and flamboyant style, resulting in the nickname, \"The Dapper Don.\" Between 1957 and 1961, Gotti pursued a Ilk' of crime on a full-time basis. I I is arrest record included street fighting, public intoxication, and car theft. By his 21st birthday, Gotti had been arrested five times, but served little gaol lime. On\nMarch 6, 1962, Gotti married li-year-old\njctoria DiGiorgio .. At the time of their J]LUllage, OiGiorgio had already given birth to their first child, Angela, and was pregnant with their second. Gotti briefly tried his band at legitimate jobs for the sake of his family: first, as a presser in a coat factory, and then as an assistant to a truck driver. In 1992, Gotti was convicted of 13 murders and various other charges and was sentenced to Iife in prison ¥lithout parole. He died there 10 years later. (biography.co1n·",
    "a": "Although Gotti was arrested five times by the time he was 21, he left crime entirely when he married Victoria DiGiorgio. ",
    "b": "Born in the Bronx, Gotti was known as \"The Dapper Don\" and at one time worked in a coat factory. ",
    "c": "Although Gotti was arrested many times, no court ever punished him for a crime. ",
    "d": "By the time he was 21, Gotti had served five years in prison for public intoxication, street fighting, and car theft",
    "correct": "B"
  },
  {
    "text": "A battle-scarred, eighth-century town unearthed in northern Germany may be the earliest Viking settlement in the historical record, archaeologists announced recently, Ongoing excavations at fusing, near the Danish border, link the site to the \"lost\" Viking fawn of Sliasthorp, which was first recorded in AD 8-04 'by royal scribes of the powerful Frankish ruler Charlemagne. Some 30 buildings have been uncovered since excavations began in 2010. Chief among them is a Viking Ionghouse measuring more than a hundred feet (30 metres). long and 30 feet (9 metres) ride, The longhous,e's burnt-out remains seemingly bear witness to a violent attack: Arrowheads found embedded in its charred wall posts suggest the communal building was at some point set on fire and shot at, Dobat said. A calrrop - a type of small, spiked iron weapon that was scattered on the ground for the enemy to step on - was also found at the entrance. Other finds include precious jewellery, glass beads, and silver coins. (National GwgraphicJ",
    "a": "The lost Viking town of Sliasthorp located in Germany near the Danish border was once visited by Charlemagne",
    "b": "Scribes of the Frankish ruler Charlemagne first recorded the Viking settlement of Sliasthorp in AD 804",
    "c": "The caltrop is a type of large arrowhead weapon hat sticks into the walls of wooden buildings Iike Viking Ionghouses.",
    "d": "Arrowheads found in scorched wall posts of a Viking longhouse indicate that Danish warriors attacked the building",
    "correct": "B"
  },
  {
    "text": "Just days after a poacher's snare had killed one of their own, two young mountain gorillas worked together Tuesday to find and destroy traps in\ntheir Rwandan forest home, according to conservationists on the scene. Bush-meat hunters set thousands of rope-and-branch snares in Rwanda's Volcanoes National Park, where the mountain gorillas live. The traps are intended for antelope and other species but sometimes capture\nthe apes. Adults are generally strong enough to free themselves .. Youngsters aren't always so lucky. Just last week an ensnared infant named ~gwino, found too late by workers from Karisoke, died of snare-related wounds. Her shoulder had been dislocated during escape attempts, and gangrene had set in after the ropes cut deep into her leg. The hunters seem to have no interest in the gorillas. Even small apes, which would be relatively easy to carry away for sale, are left to die .. (J\\·ational Geographic'",
    "a": "It is almost always the young male gorillas who dismantle the snares because it is their role to protect the clan ",
    "b": "Volcanoes National Park employees look for and dismantle snares, and young gorillas often help them with the task. ",
    "c": "Poachers in Rwanda set snares to capture young mountain gorillas because they can sell them for large profits.",
    "d": "While adult gorillas are often strong enough to free themselves from the snares, young ones often cannot. ",
    "correct": "D"
  },
  {
    "text": "Rhinovirus infection is linked to about 70 per cent of all asthma exacerbations with more than 50 per cent of these patients requiring hospitalisation. Furthermore, over 35 per cent of patients with acute chronic obstructive pulmonary disease (COM are hospitalised each year due to respiratory viruses including rhinovirus. A new antiviral drug to treat rhinovirus infections is being developed by Melbourne company Biota Holdings Ltd, targeted for those with these existing conditions where the common cold is a serious threat to their health and could prove fatal. A team of researchers is now using information on how the new drug works to create a 3D simulation of the complete rhinovirus using Australia's fastest supercomputer. (Science Daily)",
    "a": "Every year, nearly one in four patients with COPD are hospitalised due to respiratory viruses such as rhinovirus.",
    "b": "The antiviral drug being developed by Biota Holdings Ltd disables rhinovirus by binding to the shell that surrounds it.",
    "c": "Using Australia's supercomputer technology allows researchers to monitor how a drug will work at a molecular level.",
    "d": "For individuals with asthma and COPD respiratory viruses such as rhinovirus can be extremely serious and even fatal.",
    "correct": "D"
  },
  {
    "text": "Eurozone finance ministers today finalised an aid package for Spanish banks worth €100 billion, saying the programme was \"warranted to safeguard financial stability in the euro area as a whole\". The funds will be parked with the eurozone's temporary bail-out fund, the European Financial Stability Facility (EFSF), until the eurozone's permanent rescue fund, the European Stability Mechanism (ESM) \"becomes available\". The ESM was scheduled to come into force on 9 July but has been held up because Germany's constitutional court\nis looking into whether its ratification would be unconstitutional. When requested, the credit would be channelled through Spain's bank-resolution fund, FROB, to the banks. Before receiving a loan, banks would be subjected to a stress test intended to determine the amount of support necessary to keep them afloat. The appraisal of the banks' needs is expected to be completed in September. (European Voice)",
    "a": "The €100 billion aid package for Spanish banks would be dispensed through Spain's bank-resolution fund when requested.",
    "b": "Worries about the size of Spain's debt have limited its access to the financial markets and may lead to the use of austerity measures.",
    "c": "Following a request for financial aid, there would be a waiting period before it would be dispersed to Spanish banks.",
    "d": "When applying for credit, banks must supply the estimated amount they need to maintain solvency.",
    "correct": "A"
  },
  {
    "text": "In 1887, Constance and Eva Gore-Booth were presented at the court of Queen Victoria, with Constance, 19 at the time and older than Eva by two years, described by some in Victorian England as \"the new Irish beauty\". Moving in the aristocratic circle of the Protestant Ascendancy, under which Ireland was dominated politically and economically by great landowners like their father, the Gore-Booth sisters were seemingly destined to live lives replete with the comforts and privileges of the landed class. But both women eventually broke from their background, rejected their wealth and dedicated their lives to confrontation and the cause of the poor. Less than two decades after she sat at Lissadell for a portrait by Yeats, Constance would be sitting in a Dublin gaol cell, listening to the volleys of firing squads as she awaited her own execution for her involvement in the Easter Rising. And Eva would become an acclaimed poet herself, as well as a prominent voice for women's suffrage. (smithsonianmag.com)",
    "a": "Constance Gore-Booth was gaoled in Dublin and sentenced to death for her participation in the Easter Rising insurrection.",
    "b": "While Eva Gore-Booth was an acclaimed poet, she dedicated most of her time to securing the right to vote for women.",
    "c": "Constance and Eva Gore-Booth lived all their lives surrounded by the comforts and privi¬leges of the upper classes.",
    "d": "Due in large part to the influence of Yeats, Constance Gore-Booth became involved in the Easter Rising.",
    "correct": "A"
  },
  {
    "text": "A recently published study examined how decision-making would be affected by a human-like aid. The study focused on adults' trust, dependence, and performance while using a computerized\ndecision-making aid for persons with diabetes. The study is one of the first to examine how the design of decision-support aids on consumer devices can influence the level of trust that users place in that system and how much they use it. Many people interact with computerised decision aids or automation on a daily basis, whether they're using smart phones, digital cameras or global positioning systems. When automation is only reliable sometimes, a person's level of trust becomes an important factor that determines how often the aid will be used. The research findings have revealed that the inclusion of an image of a person can significantly alter perceptions of a computerised aid when there is no difference in the aid's reliability or presentation of information. (Science Daily) ",
    "a": "An individual's level of trust in computerised decision aids has influence on how they use a device.",
    "b": "An individual's level of trust in computerised decision aids is highly influenced by the design used ",
    "c": "Research shows that computerised decision-making aids that include an image of a person change how such an aid is perceived. ",
    "d": "Research shows that human-like computerised decision aids may reduce decision-making reaction time for adults.",
    "correct": "C"
  },
  {
    "text": "In all, Francis of Assisi, noted ascetic, holv man and future saint, found that he bore five marks: two on his palms and h,·o on his feet, where the nails that fixed Christ to the cross were traditionally believed to have been hammered home, and the fifth on his side, where the Bible says Jesus had received a spear thrust from a Roman centurion. This was the first case of stigmata - the appearance of marks or actual wounds paralleling those Christ received during Crucifixion - described. later stigmatics land there have been several hu'itdred of them) have exhibited similar marks, though some bear onlv one or two wounds, while . thers aiso display scratches on their foreheads. where Christ would have been injured bv his crown of thorns. Through the centuries, stigmata has become .. one of the best-documented, and most controversial, of mystical phenomena. The extensive record makes it possible to compare cases that occurred centuries apart. At least ten more were recorded in the 13th century. tsmithsonianmag-com ",
    "a": "Stizmatics bear the five marks that mimic those wounds that Christ received during the Crucifixion,",
    "b": "Among the stigmata marks borne by ascetic and holy man Francis of Assisi were scratches on his forehead.",
    "c": "Stigmata is a controversial mystical occurence that has been reportedly experienced by several hundred individuals.",
    "d": "Francis  of Assisi who has been recoznized as a saint. was the first person to bear the wounds of Christ.",
    "correct": "C"
  },
  {
    "text": "Modern cats diverged in skull shape from their saber-toothed ancestors early in their evolutionary history and then followed separate evolutionary trajectories, according to new research. The study also found that the separation between modern domestic cats and big cats such as lions\nand tigers is also deeply rooted. Scientists studied the skull shape of extinct saber-toothed cats, modem tconical-toothedl cats and prehistoric 'basal' cats (ancestors of modern cats). This is the first time these three different types of cats have been analyzed together in a single dataset.\nThe researchers quantified skull shape by taking various measurements, adjusting these measurements for size differences then investigating the distribution of cat skulls in shape-space. They found an early and conspicuous divergence between the conical-toothed cats and saber-toothed cats, with all saber-toothed cats being more closely related to each other than thev were to modem conical-toothed cats ..\nSciettce Dail",
    "a": "Their parallel evolutionary trajectories underlie the close connection between modem big cats such as lions and tigers and modem domestic cats.",
    "b": "Despite the divergence between the skull shapes of extinct sabre-toothed cats and modem domestic cats, these two different types of cats are closely related to each other. ",
    "c": "Skull shape indicates that all types of sabre-toothed cats were more closely related to one another than to modem conical-toothed cats.",
    "d": "The skull shapes of sabre-toothed and conical-toothed cats indicate that they followed different evolutionary trajectories.",
    "correct": "C"
  },
  {
    "text": "When headlines about a potential Sicilian default ricocheted the globe, the government quickly played down concerns and said it would send 400 million euros to ease Sicily's liquidity crunch so it could continue to pay salaries and pensions. But with Europe's debt crisis, local politics quickly become international problems. And the flare- up over Sicily highlights the challenges that Mr. Monti is facing in trying to use pressure from European leaders and international markets to push Italy's politicians to cut costs. Those expenses have ballooned after decades of a patronage system in which the state has been the primary means of employment in Sicily. It was also a stark reminder of Italy's national fragility as Mr. Monti struggles to prevent the country from requiring a bailout that would come with the onerous terms that have plagued the Greek and Spanish economies. (New York Times)",
    "a": "The 400 million euros the government promised to send to Sicily would not cover all salaries and pensions.",
    "b": "Mr. Monti is attempting to leverage pressure from international markets and seeks to avoid the need for financial rescue.",
    "c": "Even if Sicily receives a €400 million relief package, its government employees are still expected to remain unpaid.",
    "d": "Sicily has been driven into dire financial straits due to corruption in state employment.",
    "correct": "B"
  },
  {
    "text": "It was a quiet, humid Monday morning in Paris, 21 August 1911. Three men were hurrying out of the Louvre. It was odd, since the museum was closed to visitors on Mondays, and odder still considering what one of them had under his jacket. They were Vincenzo Perugia and the brothers Lancelotti, Vincenzo and Michele, young Italian handymen. They had come to the Louvre on Sunday afternoon and secreted themselves overnight in a narrow storeroom near the Salon Carre, a gallery stuffed with Renaissance paintings. In the morning, while wearing white workmen's smocks,\nthey had gone into the Salon Carre. They seized a small painting off the wall. Quickly, they ripped off its glass shadow box and frame and Perugia hid it under his clothes. They slipped out of the gallery, down a back stairwell and through a side entrance and into the streets of Paris with the Mona Lisa. It would be 26 hours before someone noticed that the painting was missing. (sn1itl.iso1tianmag.com)",
    "a": "On an August morning in 1911, the Mona Lisa \"was stolen from the Louvre, taken from its glass shadow box and frame.",
    "b": "A single Italian handyman stole the Mona Lisa on 21 August 1911 by hiding it in his clothing on his wav out of the Louvre.",
    "c": "The Mona Lisa had been gone for 26 hours before anyone noticed because the Louvre's 1,000 rooms were unmonitored on Mondays.",
    "d": "When the Mona Lisa was stolen in August of 1911, the painting was already recognised as a Renaissance masterpiece.",
    "correct": "A"
  },
  {
    "text": "The biggest known crocodile has been found - and the 8.3-metre-long predator likely swallowed early humans whole, a new study says. Crocodylus thorbjarnarsoni lurked in deep lakes near present-day\nLake Turkana in Kenya between about two and four million years ago. According to research, the ancient animal would have resembled a heavyset Nile crocodile, some of which can reach up to 6 metres\nlong. Other species in the wider category of crocodyliforms - part of a group that includes modem-day alligators, caimans, and more - are bigger, such as the 12-metre¬long SuperCroc. The prehistoric reptile likely got so big from eating plentiful large prey - including our ancestors, who at the time stood about 1.2 metres tall as adults. When C. thorbjarnarsoni gobbled an early human, \"the whole thing [probably went] d~wn the gullet, so nothing gets fossilized,\" said Hastings, who discovered a prehistoric crocodile species in 2011. (National Geographic)",
    "a": "The giant Crocodylus thorbjarnarsoni likely ambushed our 1.2-metre tall ancestors when they went to collect water.",
    "b": "Crocodylus thorbjarnarsoni is the biggest species in the category of crocodyliforms, which also includes caimans.",
    "c": "Crocodylus thorbjarnarsoni, the largest croco¬dile known, is a distant ancestor of the Nile crocodile.",
    "d": "The 8.3-metre-long C. thorbjarnarsoni lived about two to four million years ago in lake waters of present-day Kenya.",
    "correct": "D"
  },
  {
    "text": "In 1848, the British East India Company sent Robert Fortune on a trip to China's interior, an area forbidden to foreigners. Fortune's mission was to steal the secrets of tea horticulture and manufacturing. The Scotsman donned a disguise and headed into the Wu Si Shan hills in a bold act of corporate espionage. Although the concept of tea is simple - dry leaf infused in hot water - the manufacture of it is not intuitive at all. Tea is a highly processed product. At the time of Fortune's visit the recipe for tea had remained unchanged for two thousand years, and Europe had been addicted to it for at least two hundred of them. But few in Britain's dominions had any firsthand or even secondhand information about the production of tea before it went into the pot. Fortune's horticultural contemporaries in London and the directors of the East India Company all believed that tea would yield its secrets if it were held up to the clear light and scrutiny of Western science. (smithsonianmag.com)",
    "a": "Robert Fortune's \"corporate espionage\" trip to China was the first attempt by the British East India Company to steal the secrets of tea horti-culture and manufacturing.",
    "b": "Tea is nothing more than an infusion of dry leaf in hot water, and the process of manufacturing tea is just as simple.",
    "c": "In 1848 when Robert Fortune visited the Wu Si Shan hills of China, the recipe for tea had not changed for two thousand years.",
    "d": "In 1848 within the British East India Company, only a few people had firsthand or secondhand knowledge of tea production.",
    "correct": "C"
  },
  {
    "text": "Text messaging may offer tweens a quick way to send notes to friends and family, but it could lead to declining language and grammar skills, according to researchers. Tweens who frequently use language adaptations - \"techspeak\" - when they text performed poorly on a grammar test, said Drew Cingel, a former undergraduate student in communications, Penn State, and currently a doctoral candidate in media, technology and society, Northwestern University. When tweens write in techspeak, they often use shortcuts, such as homophones and omissions of non-essential letters and initials, to quickly and efficiently compose a text message. \"Overall, there is evidence of a decline in grammar scores based on the number of adaptations in sent text messages, controlling for age and grade,\" Cingel said. Not only did frequent texting negatively predict the test results, but both sending and receiving text adaptations were associated with how poorly they performed on the test, according to Sundar. (Science Daily)",
    "a": "Research shows that tweens who text daily with friends and family are better adapted socially but perform less efficiently on grammar than their peers.",
    "b": "Studies show that how tweens perform on a grammar test is unrelated to how many text adaptations they send and receive.",
    "c": "Research shows that tweens who use techspeak when texting could experience a decline in grammar and language skills.",
    "d": "According to research, the use of techspeak is the primary reason for the decline in grammar scores among tweens.",
    "correct": "C"
  },
  {
    "text": "The head of the European Central Bank (ECB) said on Thursday that policy makers would do \"whatever it takes\"\nto save the euro zone, buoying global financial markets. The comment by Mario Draghi, the ECB president, raised hopes that the central bank is becoming more willing to throw its weight around in bond markets, buying huge quantities of debt to keep borrowing costs for Spain and Italy from rising so high that they threaten the common currency. In the three years that the euro zone crisis has festered, there have been many occasions when European officials unveiled policy responses and market optimism soon evaporated. Mr. Draghi didn't specify\nthe actions that policy makers may take, but the Spanish government and the International Monetary Fund have all but begged the ECB to resume buying bonds\nas a way to clamp down on the turmoil plaguing financial markets. (New York Times) ",
    "a": "Market optimism always soon evaporated when the policy responses of the European offi-cials handled the euro zone crisis inadequately and inefficiently. ",
    "b": "The ECB president said that policy makers would take steps to save the euro zone but did not specify what steps. ",
    "c": "Should the ECB buy large amounts of debt as well as bonds, global financial markets would see a sharp recovery. ",
    "d": "The International Monetary Fund and the government of Spain have urged the ECB to resort to its ultimate instrument, buying bonds.",
    "correct": "B"
  },
  {
    "text": "The job of a renaissance court portraitist was to produce likenesses of his sovereigns to display at the palace and give to foreign dignitaries or prospective brides. It went without saying the portraits should be flattering. Yet, in 1590, Giuseppe Arcimboldo painted his royal patron, the Holy Roman Emperor Rudolf II, as a heap of fruits and vegetables. With pea pod eyelids and a gourd for a forehead, he looks less like a king than a crudite platter. Lucky for Arcimboldo, Rudolf had a sense of humour. Arcimboldo served the Hapsburg family for more than 25 years, creating oddball \"composite heads\" made of sea creatures, flowers, dinner roasts and other materials. Part scientist, part sycophant, part visionary, Arcimboldo was born in 1526 in Milan. Giuseppe's father was also an artist, and Giuseppe's early career suggests the young man designed cathedral windows and tapestries rife with angels, saints and evangelists. Though apples and lemons appear in some of the divine scenes, the produce is, comparatively, less remarkable than that of the fruit portraits. (smithsoniantnag. corn) ",
    "a": "Giuseppe was not only a visionary painter and a scientist, but evidence suggests that he also designed tapestries. ",
    "b": "Giuseppe most likely learned from his father how to paint sea creatures, flowers, dinner roasts, pea pods, gourds, and more.",
    "c": "In 1590, Arcimboldo painted Holy Roman Emperor Rudolf II at the emperor's request.",
    "d": "Fron1 the beginning of his career as an artist, rd1nboldo used only fruits and vegetables as the dcnu~nts of his works.",
    "correct": "A"
  },
  {
    "text": "What does a robot feel when it touches something? Researchers published a study showing that a specially designed robot can outperform humans in identifying a wide range of natural materials according to their textures, paving the way for advancements in prostheses, personal assistive robots and consumer product testing. The robot was equipped with a new type of tactile sensor built to mimic the human fingertip. So, is touch another task that humans will outsource to robots? Fishel and Loeb point out that while their\nrobot is very good at identifying which textures are similar to each other, it has no way to tell what textures people will prefer. Instead, they say this robot touch technology could be used in human prostheses or to assist companies who employ experts to assess the feel of consumer products and even human skin. (Scit~11n· Di1ily)",
    "a": "A robot with a special tactile sensor that simulates the fingertip of a human can outperform humans in identifying materials.",
    "b": "Robots with a special tactile sensor could be used to advance some types of health products or assist with testing consumer products.",
    "c": "Robots with a special tactile sensor are able to identify many materials including plastic, wood. wool. silk. and polyester.",
    "d": "Robots with a special tactile sensor can outperform humans .at jobs that deal with texture comparison and people's texture preferences.",
    "correct": "B"
  },
  {
    "text": "A new study concludes that among older adults - especially those who are frail - Iow levels of vitamin D can mean a much greater risk of death. The randomised, nationally representative study found that older adults with low vitamin D levels had a 30 per cent greater risk of death than people who had higher levels. Overall, people who were frail had more than double the risk of death than those who were not frail. Frail adults with low levels of vitamin D tripled their risk of death over people who were not frail and who had higher levels of vitamin D. Because of the cross-sectional nature of the survey, researchers could not determine if low vitamin D contributed to frailty, or whether frail people became vitamin D deficient because of health problems. Ho-we,-er, Smit said the longitudinal analysis on death showed it may not matter which came first. (Science Daily)",
    "a": "Indi\\iduals who are frail develop vitamin D deficiency primarily because of their health problems.",
    "b": "frail older adults with low vitamin D levels are three times as likely to die as those who are not frail and have higher levels.",
    "c": "According to the new study, older adults with low vitamin D levels faced a lower risk of dying than those with higher Ievels,",
    "d": "According to most studies, researchers have concluded that low vitamin D levels contribute to frailty in older adults.",
    "correct": "B"
  },
  {
    "text": "Mariza, the internationally known Portuguese singer, is captivating yet another audience with the haunting sounds of £ado - the music called the soul of Portugal and often compared to American blues. As her voice fills the hall - alternately whispering and shouting, rejoicing and lamenting - the wildly receptive audience confirms her rising reputation as the new queen of fado, and the genre's increasing world appeal. The roots of fado, Portuguese for fate or destiny, are a mystery. But musicologists see it as an amalgam of cultures, especially African and Brazilian, stemming from Portugal's maritime and colonial past, combined with its oral poetry tradition and, possibly, some Berber-Arab influence from the long Moorish presence that spanned the 8th through the 13th centuries. In the 19th century, fado became popular among the urban poor of Lisbon. It was sung in bars, back streets and brothels. (smithso11ai11111ag.co1n)",
    "a": "The urban poor of 19th-centurv Lisbon were drawn to fado because they could sing it any time or place.",
    "b": "Accorcing to musicologists, fado comes from just Portuguese, Moorish, and Berber-Arab cultures and oral poetry traditions.",
    "c": "Fado music is currentlv more popular around the world than it was among the urban poor of 19th--century Lisbon.",
    "d": "Fado, which means \"fate\" or \"destiny\" in Portuguese, is called the soul of Portugal and is compared to American blues.",
    "correct": "D"
  },
  {
    "text": "Autism spectrum disorders, including Asperger syndrome, have generally been associated with uneven intellectual profiles and impairment, but according\nto a new study of Asperger individuals, this may not be the case - as long as intelligence is evaluated by the right test. Both autistic and Asperger individuals display uneven profiles of performance in commonly used intelligence test batteries such as Wechsler scales,\nand their strongest performances are often considered evidence for deficits. However, this study reports that Asperger individuals' scores are much higher when they are evaluated by a test called Raven's Progressive Matrices, which encompasses reasoning, novel problem-solving abilities, and high-level abstraction. By comparison, scores for non-Asperger individuals are much more consistent across different tests. (Science Daily)",
    "a": "A recent study of Asperger individuals suggests that the measure of intelligence is exactly quantifiable.",
    "b": "Asperger individuals score higher than non¬Asperger individuals on the Raven's Progressive ~ Iatrices test",
    "c": "In general .. Asperger individuals score more unevenly on different types of intelligence tests than their non-Asperger peers.",
    "d": "High-level abstraction and the ability to solve novel problems are considered higher forms of intelligence.",
    "correct": "C"
  },
  {
    "text": "Few insects capture the imagination like bees do. Honeybees CApis melliferat in particular, with their social hierarchy and sweet product, have long been part of our literary and agricultural heritage. Honeybees are the workhorses of modem farms, which rely on them to pollinate crops. That dependence has made reports of declining bee populations and colony collapse all the more alarming. Although bees are known to be affected by, environmental shifts, including habitat loss and climate change, public attention has been focused on a class of pesticide called neonicotinoids, or neonics. But the link between these pesticides and colony collapse remains obscure. Daunting as the prospect is of losing our main pollinators, the furore has masked wider issues. Not only honeybees are at risk - solitary bees face greater threats. Like humans, bees have microbes in their guts that provide a host of benefits, and studying the honeybee provides insights into how biological and synthetic systems interact. (nature.com)",
    "a": "The interaction of biological and synthetic systems within the gut of a bee can prove as harmful to a bee as it is for a human.",
    "b": "The decline in the honeybee population means they may be wiped out altogether in some areas.",
    "c": "Solitary bees face the same threat as honeybees as environmental changes lead to the loss of their natural habitat.",
    "d": "Neonicotinoids have been linked with the decline in the number of bees, however this link has not been categorically confirmed.",
    "correct": "D"
  },
  {
    "text": "Superconductivity is one of the most fascinating phenomena known to humankind. When a superconductor is cooled below its 'critical temperature', the fluid of electrons, which is responsible for the conduction of electricity through the material, undergoes a radical re¬organisation. The electrons form 'Cooper pairs' and these Cooper pairs condense into a single, collective quantum state, which means they all behave as a single entity. This allows the manifestation of quantum-mechanical effects, which are normally confined to the world of sub-microscopic particles, on a scale that is visible to the naked eye. While in conventional superconductors (and also in some high-temperature superconductors) the electrons in a Cooper pair have their intrinsic 'spins' pointing in opposite directions, so that the total spin of the Cooper pair is zero, in other, more exotic 1triplet' superconductors the electronic spins line up, so the Cooper pair has some intrinsic spin of its own. (Science Daily)",
    "a": "Electrons that form Cooper pairs act as one entity, rendering quantum-mechanical effects visible to the naked eye.",
    "b": "In conventional superconductors, the electrons form Cooper pairs so that the electronic spins form a cloud.",
    "c": "In triplet superconductors, Cooper pairs allow for quantum-mechanical effects, but they are not visible to the naked eye.",
    "d": "Conventional, high-temperature, and triplet superconductors all cannot operate above the same critical temperature.",
    "correct": "A"
  },
  {
    "text": "Once a required stop on caravan routes that brought Asian goods west to eager Romans, Palmyra has \"always been conceived as an oasis in the middle of the desert, but it's never been quite clear what it was living from,\" said Michal Gawlikowski, the retired head of the University of Warsaw's Polish Mission at Palmyra. And what an oasis: Among the ruins are grand avenues lined with columns, triumphal arches, and the remains of an ancient market where traders once haggled over silk, silver, spices, and dyes from India and China. The landscape around the city, it now appears, was intensively farmed and most likely included olive, fig, and pistachio groves-crops known in the region from Roman accounts and still common in Syria. Barley too was grown, according to a pollen analysis Meyer's team conducted on a mud brick from the survey area. (National Geographic)",
    "a": "Palmyra served not only as a caravan stop but it was most likely an agricultural centre of the region thanks to the intensive cultivation.",
    "b": "Ancient residents of Palmyra likely grew a number of different crops in the surrounding area including figs and barley.",
    "c": "Ancient residents of Palmyra likely captured the small amount of annual rainfall to water their crops and pistachio groves.",
    "d": "Palmyra once served as a caravan stop where traders bargained over silks, spices, and other goods from all over the world.",
    "correct": "B"
  },
  {
    "text": "Several centuries ago, many practising Christians, and those of other religions, had a strong belief that the Devil could give certain people known as witches\nthe power to harm others in return for their loyalty. A \"witchcraft craze\" rippled through Europe from the 1300s to the end of the 1600s. Tens of thousands of supposed witches - mostly women - were executed. Though the Salem trials came on just as the European craze was\nwinding down, local circumstances explain their onset. The Salem witch trials occurred in colonial Massachusetts between 1692 and 1693. More than\n200 people were accused of practising witchcraft- the Devil's magic - and 20 were executed. Eventually, the colony admitted the trials were a mistake\nand compensated the families of those convicted. Since then, the story of the trials has become synonymous with paranoia and injustice, and it continues to beguile the popular imagination more than 300 years later. (smithsonianmag. cam)",
    "a": "The \"witchcraft craze\" in Europe between the 13th and 16th centuries was the gravest period in the history of witch-hunts.",
    "b": "More than 200 accused witches were executed in the Salem trials in colonial Massachusetts between 1692 and 1693.",
    "c": "Colonial Massachusetts ultimately acknowl¬edged that the witch trials were an error and recompensed families of the convicted.",
    "d": "Practising Christians in Europe were largely responsible for stirring up paranoia about witches.",
    "correct": "C"
  },
  {
    "text": "For the first four decades of competition, the Olympics awarded official medals for painting, sculpture, architecture, literature and music, alongside those for the athletic competitions. From 1912 to 1952,\njuries awarded a total of 151 medals to original works in the fine arts inspired by athletic endeavours. The story goes all the way back to the Baron Pierre\nde Coubertin, the founder of the IOC and the modern Games, who saw art competitions as integral to his vision of the Olympics. \"He was raised\nand educated classically, and he was particularly impressed with the idea of what it meant to be a true Olympian - someone who was not only athletic, but skilled in music and literature,\" Stanton says. \"He felt that in order to recreate\nthe events in modern times, it would be incomplete to not include some aspect of the arts.\" (smithsonianmag.com)",
    "a": "For the first four decades of the Olympics, juries awarded medals for works of fine art depicting any subject matter.",
    "b": "Between 1912 and 1952, Olympic juries awarded 151 medals to gifted artists who were also highly skilled athletes.",
    "c": "Baron Pierre de Coubertin felt that the modern Olympics would not be complete without some inclusion of the arts.",
    "d": "For the first four decades of the Olympics, the majority of art medals were awarded for paint¬ings of the games themselves.",
    "correct": "C"
  },
  {
    "text": "Nicolaus Copernicus was the first to demonstrate that the earth orbited the sun, upsetting the prevailing notion that the earth was the centre of the cosmos.\nA 30-year project, On the Revolutions of the Heavenly Spheres was Copernicus' response to the unwieldy mathematics used since the days of the ancient Greeks to explain the motion of the sun, moon and five known planets (Mercury, Venus, Mars, Jupiter and Saturn). Astronomers had worked from the assumption that\nthe earth was the centre of the universe, forcing them to draw convoluted orbits for the planets, which even had to reverse directions for the theory to be consistent with their observed trajectories. Once Copernicus put the sun at the centre of the picture and adjusted the mathematics, the planetary orbits became regular, smooth and elegant. His inspiration came early, but the cautious scholar took half\na lifetime to check his figures before publishing them in 1543, the year he died at age 70. (smithsonianmag.com)",
    "a": "Nicolaus Copernicus used convoluted mathe-matics and planetary orbits to demonstrate that the earth orbited the sun.",
    "b": "Copernicus delayed publishing his conclusions until he was 70 because he was cautious about his calculations and feared he would be perse¬cuted as a heretic for his work.",
    "c": "Prior to Copernicus, astronomers used math-ematics and complex planetary orbits to deduce that the earth was the centre of the universe.",
    "d": "Prior to Copernicus, astronomers had most likely explained the motions of heavenly bodies using mathematics dating to the ancient Greeks.",
    "correct": "D"
  },
  {
    "text": "Pavegen tiles are designed to collect the kinetic energy created by the estimated 40 million pedestrians who will use that walkway in a year, generating several hundred kilowatt-hours of electricity\nfrom their footsteps. Once a Pavegen tile converts energy to eJectridty, 5 pef cent of it Is used to Jight the round LED-hghted logo in the centre of each tile. The other\n95 per cent Is either directly fed to the applkation or stored in a battery for later use. Pavegen is also working on a new system that will feed the power directly into a grid. The tiles are completely waterproof, so they can endure rain,\nsnow, and ice. Pavegen's tHes are designed to have a minimal carbon footprint.\nAJJ of the rubber comes from recycled truck tires, and about 80 per cent of the polymers used for the other components can be recycled. On average, one footstep generates 7 watts of electricity, though the amount varies depending on a person's weight. (National Geographic)",
    "a": "The amount of electricity generated by a person's single footstep depends solely on that person’s weight.",
    "b": "Pavegen tiles are made with rubber from recyled tires and have a carbon footprint that is less than that of any other energy source.",
    "c": "The more recyclable component an energy source contains, the less carbon footprint it has.",
    "d": "Pavegen tiles arc waterproof, have a minimal carbon footprint and collect an average 7 watts of electricity per footstep.",
    "correct": "D"
  },
  {
    "text": "UC Irvine scientists have discovered intriguing differences in the brings and mental processes of an extraordinary group of people who can effortlessly recall every moment of their lives since about age 10. AIJ had variations in nine structures of their brains compared to those of control subjects, including more robust white matter linking the middle and front parts. Surprisingly, the people with stellar autobiographical memory did not score higher on routine laboratory memory tests or when asked to use rote ·memory aids. Yet when it came to public or private events that occurred after age 10½, they were remarkably better at recalling the details of their live. The study also found significant evidence of obsessive-compulsive tendencies among the group, but the authors do not yet know if or how this aids recollection. Many of the individuals have large, ·minutely catalogued collections of some sort, such as magazines, videos, shoes, stamps or postcards. (Science Daily)",
    "a": "People with remarkable autobiographical memories are more likely to have- obsessive-compulsive tendencies than control subjects",
    "b": "obsessive-compulsive behaviors share the same neural pathways as those, used to store and recall autobiographical memories.",
    "c": "The .brains .of people. with extraordinary autobiographical memories may have larger prefrontal lobes than those of control group",
    "d": "People who could remember, every moment of their live from around ,10 also scored higher when using rote memory aids",
    "correct": "A"
  },
  {
    "text": "Music was a key ingredient in ancient Egyptian religion. Teeter explains that jt was believed to soothe the gods and encourage them to provide for their worshippers. Nehemes-Bastet was one of many priestess musicians who performed inside the sanctuaries and in the courts of the temples. The musical instrument typically used were the menat, a multistrand beaded necklace they would shake, and the sistrurn, a hand held rattle whose sound was said to evoke wind rustling through papyrus reeds. Other musician wouJd have played drums, harps, and lutes during religious processions. \"For years people have debated what kind of music it was,\" says Teeter. \"But there' no musical notation left, and we're not sure how they tuned the instruments or whether they sang or chanted.\" Th emphasis was definitely on percussion. Images often show people stamping their feet and clapping, Examples of song lyrics are recorded on temple walls. (archaeoloKY·org)",
    "a": "In ancient. Egypt, priestesses and musicians both sang and chanted during religious ceremonics.",
    "b": "Evidence recorded ,,n temple walls suggest,; that ancient Egyptian music was like an early form of modern percussion music",
    "c": "Music in ancient Egypt accompanied religious processions and ·was, made using the menat and the sistrurn and probably drums, lutes, and harps.",
    "d": "Musical instruments, of ancient Egypt include the -menat, a necklace that might have also had a decorative function·",
    "correct": "C"
  },
  {
    "text": "The European Union has signed a fisheries agreement with Mauritania in west Africa. The total cost to the EU budget for fishing rights off the coast of the former French colony will be €70 million per year, according to the European Commission. The agreement allows EU ships to fish for demersal - a group of fish that lives or feeds near the bottom of the sea. Though the annual payment to the Mauritanian government will remain the same, access to fish has been reduced. Fish can now only be caught more than 20 miles from the shore, up from 13 miles in the previous agreement. There is also a new requirement that 2% of the catch must be given to the Mauritanian government. \"The EU will pay the same amount of money but for much less fish,\" said Gerard van Balsfoort of the Pelagic Freezer-Trawler Association. \"50-60% of the fleet was catching between 13 and 20 miles from the shore.\" Balsfoort said the restrictions will make the fishing rights worthless to EU fishermen. (European Voice)",
    "a": "Under a new fisheries agreement with Mauritania, the EU will no longer have to give 2% of its catch to Mauritania.",
    "b": "The new fisheries agreement does not allow the EU to catch fish between 13 miles and 20 miles from the shore because it is Mauritania's richest fishing area.",
    "c": "The EU will pay €70 million per year for fishing rights off the coast of Mauritania, including rights to fish for demersal.",
    "d": "Although Gerard van Balsfoort has been critical of the fishing agreement, a sizeable portion of fishermen may support it.",
    "correct": "C"
  },
  {
    "text": "Many of the predictions we make in everyday life are vague, and many ofthem are wrong - like when we predict the weather - because we have incomplete information. But in quantum mechanics, the outcomes of certain experiments generally can't be predicted perfectly beforehand, even if all of the information is available. This inability to accurately predict the results of experiments in quantum physics has been the subject of a !ong debate, going back to Einstein and his co-workers, about whether quantum mechanics is the best way to predict outcomes. Randomness in quantum theory is one of its key features and is widely recognized, even outside the scientific community, says Tittel. \"Its appeal is its fundamental nature and broad range of implications: knowing the precise configuration of the universe at the big bang would not be sufficient to predict its entire evolution, for example, in contrast to classical theory.\" (Science Daily)",
    "a": "Randomness is a central feature of quantum theory with practical applications for fields as diverse as chemistry and politics.",
    "b": "The question of whether quantum mechanics offers the best way to predict outcomes dates to Einstein and his colleagues.",
    "c": "Per quantum theory, if the universe's exact arrangement at the time of the big bang was known, its evolution could be partly predicted.",
    "d": "According to quantum mechanics, if you know all the available information at the outset, you will be able to accurately predict an outcome.",
    "correct": "B"
  },
  {
    "text": "Consider Jan Lievens, born in Leiden\nin western Holland on October 24,\n1607, just 15 months after the birth of Rembrandt van Rijn, another Leiden native. While the two were alive, admirers spoke of them in the same breath, and the comparisons were not always in Rembrandt's favour. After their deaths, Lievens dropped out\nof sight - for centuries. Though the artists took quite different paths, their biographies show many parallels. Both served apprenticeships in Amsterdam with the same master, returned to that city later in life and died there in their 60s. The work the two produced in their early 20s in Leiden was not always easy to tell apart, and as time went on, many a superior Lievens was misattributed to Rembrandt. Quality aside, it mattered that Rembrandt spent virtually his entire career in one place, cultivating a single, highly personal style, whereas Lievens moved around, absorbing many different influences. Equally important, Rembrandt lent himself to the role of the lonely genius, a figure dear to the Romantics, whose preferences would shape the tastes of generations to come. (smithsonianmag.com)",
    "a": "Had Lievens developed a single personal style as a painter, he would have stolen the cloak of fame from Rembrandt.",
    "b": "Although Lievens and Rembrandt produced work that is remarkably similar, critics of their time universally favoured Rembrandt.",
    "c": "Rembrandt and Lievens were both born in Leiden, apprenticed with the same master, and created some works of great similarity.",
    "d": "Lievens' life centred on continuous change, which put him out of favour with the Romantics who idolised the lonely genius.",
    "correct": "C"
  },
  {
    "text": "Human diversity in Africa is greater than in any other place on Earth. Differing food sources, geographies, diseases and climates offered many opportunities\nfor natural selection to force Africans\nto change and adapt to their local environments. The individuals who adapted best were the most likely to reproduce and pass on their genomes\nto the generations who followed. A\nrecent study identifies several million previously unknown genetic mutations in humans. It finds evidence that the direct ancestors of modern humans may have interbred with members of an unknown ancestral group of hominids. It suggests that different groups evolved distinctly in order to reap nutrition from local foods and defend against infectious disease.\n\"A message we're seeing is that even though all the individuals we sampled are hunter-gatherers, natural selection has acted differently in these different groups.\" (Science Daily)",
    "a": "Evidence indicates that ancestors of modern humans who did not interbreed with different hominid groups failed to evolve.",
    "b": "A recent study suggests that in human evolu-tion, natural selection functioned the same in different hunter-gatherer groups.",
    "c": "A recent study suggests that humans evolved differently in order to maximise sources of nutrition and defend against diseases.",
    "d": "Early hunter-gatherers who had access to the most diverse food sources and lived in the most temperate climates were most likely to repro-duce, according to one study.",
    "correct": "C"
  },
  {
    "text": "Each new woolly mammoth carcass to emerge from the Siberian permafrost triggers a flurry of speculation about resurrecting this Ice Age giant. The two fundamental steps involved in cloning a mammoth, or any other extinct animal, are to recover its complete DNA sequence - in the case of mammoths, estimated to be more than 4.5 billion base pairs long - and to express this data in flesh and blood. The publication of the partial mammoth genome is a good start on the first problem, though the remaining 30 per cent of the genome would have to be recovered and the entire genome resequenced several more times to weed out errors. Scientists would also have to package the DNA into chromosomes - and at present they don't even know how many chromosomes the mammoth had. Yet none of these tasks appears insurmountable, especially in light of recent technical advances, such as a new generation of high-speed sequencers and a simple, inexpensive technique for recovering high-quality DNA from mammoth hair. (National Geographic)",
    "a": "Despite recent prom1s1ng advances in tech¬nology, resurrecting a woolly mammoth in flesh and blood is not likely to happen.",
    "b": "Scientists have already sequenced part of the woolly mammoth's DNA but still have to work out how many chromosomes it had.",
    "c": "Scientists will be able to recover the 30 per cent of the mammoth genome that remains unknown from mammoth skin cells or mammoth hair.",
    "d": "Cloning a mammoth involves recovering its full DNA sequence and then recreating both male and female sex cells of the animal.",
    "correct": "B"
  },
  {
    "text": "Harriet Menloy established the modern British field of inequality and poverty studies. She has worked on inequality and poverty for over five decades. Harriet's work is predominantly focused on income distributions and the economics of public policy for third world countries, from which an inequality measure was named after her: the Menloy index. In her recent book \"Inequality: options and strategies for reform\", she argues that high levels of inequality are not inevitable and that policies can be designed to make our societies both more equitable and more efficient. ~arriet's protege Kingly Fisher's work 1s predominantly focused on macro and development economics. Much of his work concerns understanding the determinants of cross-country income differences, in particular arguing that financial underdevelopment is an important determinant of poverty and examining the effects of policies in the presence of such financial underdevelopment. His work analyses the causes and consequences of inequality within developed countries. (eib.org)",
    "a": "Harriet' s strategies for reform have had a posi-tive impact on society where implemented, making it both more equitable and efficient.",
    "b": "The Menloy index was named after her by Harriet Menloy's protege Kingly Fisher.",
    "c": "Kingly's work only concerns the causes and effects of inequality in developing countries.",
    "d": "Kingly's position on the causes of poverty revolves around the consequences of financial underdevelopment.",
    "correct": "D"
  },
  {
    "text": "The Rev. Charles Lutwidge Dodgson was a teacher of mathematics at Oxford and a deacon of the Anglican Church. Some colleagues knew him as a somewhat reclusive stammerer, but he was generally seen as a devout scholar; one dean said he was \"pure in heart.\" To readers all over the world, he became renowned as Lewis Carroll, the author of Alice's Adventures in Wonderland. Alice was popular almost from the moment it was published, in 1865, and it has remained in print ever since, influencing such disparate artists as Walt Disney and Salvador Dali. Charles Dodgson was born in 1832 in Daresbury, a village in northwest England. After enrolling at Oxford in 1850, at age 18, Dodgson became a \"senior student\" at the university's College of Christ Church. According to college rules, senior students had to be ordained as priests and take a vow of celibacy; Dodgson evaded the ordination rule and lived at the college unmarried, until his death in 1898, less than two weeks before his 66th birthday. (smithsonianmag.com)",
    "a": "Charles Lutwidge Dodgson, who used the pseudonym Lewis Carroll, was viewed as a serious scholar, a solitary man with a good heart and a stammerer.",
    "b": "Many of the characters in Alice's Adventures in Wonderland may have been inspired by the priests and academics that Charles Lutwidge Dodgson knew.",
    "c": "Charles Lutwidge Dodgson devoted much of his life to the craft of writing, though he did not publish much of his work.",
    "d": "Lewis Carroll's Alice's Adventures in Wonderland influenced Walt Disney, Salvador Dali and American filmmaker Tim Burton, among others.",
    "correct": "A"
  },
  {
    "text": "Researchers have developed a way for security systems to combine different biometric measurements - such as eye colour, face shape or fingerprints - and create a learning system that simulates the brain in making decisions. The algorithm can learn new biometric patterns and associate data from different data sets, allowing the system to combine information, such as fingerprint, voice, gait or facial features, instead of relying on a single set of measurements. The key is in the ability to combine features from multiple sources of information, prioritise them by identifying more important/prevalent features to learn and adapt the decision-making to changing conditions. Biometric information is becoming more common in our daily lives, being incorporated in drivers' licences, passports and other forms of identification. The work is not only pioneering the intelligent decision¬making methodology for human recognition but is also important for maintaining security in virtual worlds and avatar recognition. (Science Daily)",
    "a": "Security systems that can learn new biometric patterns and associate data from different data sets could contribute to solving crimes.",
    "b": "Security systems that can learn new biometric patterns and associate data from different data sets can make decisions better than a human.",
    "c": "While biometric information is being incorpo¬rated into passports and drivers' licences, it has no other practical applications.",
    "d": "Security systems are now capable of combining information from multiple sources and altering decision-making to shifting conditions.",
    "correct": "D"
  },
  {
    "text": "The most popular entertainments offered by the circuses of Rome were the gladiators and chariot racing, the latter often as deadly as the former. As many as 12 (four horse teams raced one another seven times around the confines of the greatest arenas and rules were few, collisions all but inevitable, and hideous injuries to the charioteers commonplace. Ancient inscriptions record the deaths of famous racers in their early 20s, crushed against the stone spina that ran down the centre of the race track or dragged behind their horses after their chariots were smashed. Charioteers, who generally started out as slaves, took these risks because they could win fortunes. SuccessfuI, surviving racers couId grow enormously wealthy. Spectators wagered and also won substantial sums - enough for the races to be plagued by au manner of dirty tricks; there is evidence that the fans sometimes hurled nail-studded curse tablets onto the track in an attempt to disable their rivals. (smithsonianmag. com)",
    "a": "Chariot racing mid the gladiators were the most popular attractions at Rom’s circuses, but the gladiators were always\nthe most deadly.",
    "b": "Ancient inscriptions suggests that the majority of the chariots in any race were killed by being dragged behind their horses.",
    "c": "Spectators could win so much money belling on chariot races that many of them lost their lives due lo underhanded schemes.",
    "d": "Charioteers at Rome’s circus would have faced opposing racers, stone spina and possibly curse tables full of nails.",
    "correct": "D"
  },
  {
    "text": "One hundred years ago, in 1912, astronomer Vesto Slipher found that the Andromeda galaxy was heading straight for us at a speed of 400,000 kilometres per hour. Scientists were unsure what this would mean for our galaxy in the long-term. Would we collide directly with Andromeda, a galaxy roughly the same size as our Milky Way? Or would we slide past it, like two ships passing in the night? Now, we know the Milky Way's ultimate fate: a galactic collision. The Milky Way and Andromeda galaxies will be slowly drawn together due to their mutual gravitational pull, colliding roughly 4 billion years from now. Subsequently, the two galaxies will orbit around each other before merging in one big galactic pile-up. The resulting supergalaxy will be different from either\nof the current ones: Instead of the elegant, flat, spiral-shaped disc we know and love, the new galaxy will be a three-dimensional ball of stars. Astoundingly, this massive crash won't have an enormous impact on earth or the solar system as a whole. (smithsonianmag.com) ",
    "a": "While the Milky Way and Andromeda galaxies will collide, other galaxies in the same situation simply slide past each other. ",
    "b": "The collision of the Milky Way with Andromeda will not significantly impact the earth because the process will take millions of years to complete. ",
    "c": "When the Milky Way and Andromeda galaxies collide with each other, they will immediately form one big supergalaxy. ",
    "d": "Scientists now predict that the Andromeda galaxy and the Milky Way galaxy will merge in several billion years to form a new galaxy.",
    "correct": "D"
  },
  {
    "text": "Physicists at The University of Texas at Austin, in collaboration with colleagues in Taiwan and China, have developed the world's smallest semiconductor laser, a breakthrough for emerging photonic technology with applications from computing to medicine. Miniaturisation of semiconductor lasers is key for the development of faster, smaller and lower energy photon-based technologies, such as ultrafast computer chips; highly sensitive biosensors for detecting, treating and studying disease; and next-generation communication technologies. The device is constructed of a gallium nitride nanorod that is partially filled with indium gallium nitride. Both alloys are semiconductors used commonly in LEDs. The nanorod is placed on top of a thin insulating layer of silicon that in turn covers a layer of silver film that is smooth at the atomic level. (Science Daily) ",
    "a": "The smooth arrangement of atoms in a layer of silver film inside the world's smallest semi-conductor laser differentiates it from similar devices. ",
    "b": "One component of the world's smallest semi-conductor laser is a nanorod that is partly filled with indium gallium nitride. ",
    "c": "The world's smallest semiconductor laser is composed of a thin layer of silicon that covers a gallium nitride nanorod. ",
    "d": "The world's smallest semiconductor laser will soon be on the market in the form of computer chips among other things.",
    "correct": "B"
  },
  {
    "text": "Germany's industrial sector suffers as the eurozone slides back towards recession. The manufacturing sector in the eurozone suffered a steep decline in activity in July1 according to figures recentlv released. It is the eurozone's worst PMI reading for three years and looks likely to contribute to the eurozone sliding back into recession. One of the sharpest falls in industrial orders came in Germany, showing that the main driver of the eurozone economv is now feeling the effects of the economic crisis. Its reading was also at a three-year Iow, at 4.3. Greece and Spain were the only two countries where the manufacturing sector contracted more rapidly. Only one country, Ireland, saw its manufacturing sector expand, with a score of 53.9. Chris Williamson said that July had been characterised by \"faster rates of decline in output and new orders, leading manufacturers to cut back on head counts and inventory holdings and suggesting a fear among companies towards ongoing weakness\", tEuropcan Voice",
    "a": "Spain's manufacturing sector in July suffered a more severe setback than Greece. Germany, or Ireland,",
    "b": "In July, the manufacturing sectors or Germany. Greece, and Spain declined while the same sector in Ireland expanded.",
    "c": "According; to Chris Williamson. July’s manufacturing sector slowdown reflects a temporary and seasonalty-related lapse.",
    "d": "Although Ireland s manufacturing sector expanded in July; its score 53.9 is still the lowest it has seen in three years.",
    "correct": "B"
  },
  {
    "text": "In the spring of 1963, Martin Luther King Jr. organised a demonstration in downtown Birmingham, Alabama. City police turned dogs and fire hoses on demonstrators. Martin Luther King was gaoled along with large numbers of his supporters but the event drew nation wide attention. from the gaol in Birmingham, King eloquently spelled out his theory of non-violence:  Nonviolent direct action seeks to create such a crisis and foster such a tension that a community, which has constantly refused to negotiate, is forced to confront the issue.\" By the end of the Birmingham campaign, Martin Luther King Jr. and his supporters were making plans for a massive demonstration on the nation's capital asking for peaceful change. On August 2.8, 1963, the historic March on Washington drew more than 200,000 people into the shadow of the Lincoln Memorial. It was here that King made his famous \"I Have a Dream\" speech, emphasising his belief that someday all men could be brothers. (biography.cam)",
    "a": "King delivered his \"I Have a Dream\" speech at the March on Washington just months after being gaoled in Birmingham, Alabama. ",
    "b": "Without the publicity generated by the Birmingham demonstration, the March on Washington would not have drawn 200r000 people.",
    "c": "King believed that non-violence was a way to voice concerns and work toward solutions while avoiding crisis and confrontation.",
    "d": "The ··I Have a Dream· speech was written motivate and educate all Americans at-out the civil rights movement,",
    "correct": "A"
  },
  {
    "text": "On May 6, 1937 the Hindenburg airship was about to complete its 35th trip across the Atlantic, having departed from Frankfurt, Germany and nearly arrived in New Jersey, U.S.A ... Then, suddenly, after thousands of kilometres of uneventful travel, the great zeppelin caught fire white less than 90 metres from the ground. Within a minute of the first signs of trouble, the entire ship was incinerated, and the burning wreckage crashed to the ground. Immediately after the accident, observers disagreed about what exactly sparked the explosion and what caused the airship to bum so quickly. In the years since, scientists, engineers and others have weighed in on the debate and attempted to solve the mystery of the Hindenburg. Possible causes of the explosion include a buildup of static electricity, a bolt of lightning or a backfiring engine, but at this point it's impossible to determine what exactly caused the spark. (s1nitlzso11i,1nmag.com",
    "a": "The Hindenburg airship never reached. New jersey. as the zeppelin caught fire and crashed to the ground just metres from where it was scheduled to land.",
    "b": "In 1937, after travelling from Germany to the United States, the Hindenburg caught fire and crashed to the ground.",
    "c": "Since the Hindenburg disaster, scientists and engineers have concluded that the explosion was not caused by human error.",
    "d": "A bolt of lightning most likely caused the Hindenburg to burst into flames while less than 90 metres from the ground.",
    "correct": "B"
  },
  {
    "text": "Despite claims in the 1890s that Mars was filled with canals teeming with water research over the past several decades has suggested that in fact, Mars has only a tiny amount of water, mostly near its surf ace. During the 1970s, as part of NASA's Mariner space orbiter programme, dry river beds and canyons on Mars were discovered - the first indications that surface water may have once existed there. The Viking programme subsequently found enormous river valleys on the planet, and in 2003 it was announced that the Mars Odyssey spacecraft had actually detected minute quantities of liquid water on and just below the surface, which was later confirmed by the Phoenix lander. Now there is evidence that Mars is home to vast reservoirs of water in its interior as well. The research also provides us with an answer for how underground water may have made its way to the Martian surface: volcanic activity. (smithsonianmag.com) ",
    "a": "The Viking programme discovered small amounts of liquid water on and just beneath the surface of Mars.",
    "b": "NASA's Mariner space orbiter programme discovered canyons and other formations on Mars during the 1970s. ",
    "c": "Evidence that water exists on or near Mars’ surface an in its interior suggests that theplanet once possibly supported life. ",
    "d": "Scientists claim that Mars has only a tiny amount of water, mostly near its surface",
    "correct": "B"
  },
  {
    "text": "The founding of the People's Liberation Army on 1 August 1927 is a date known to all in China. It is commemorated annually with speeches and promotions and every five years by major cultural celebrations. The events this year include operas, choral performances, photography shows and the \"National Exhibition of Artistic Works in Celebration of the 85th Anniversary of the Chinese People's Liberation Army.\" Since the earliest days, the Communist Party and the People's Liberation Army, or P.L.A., have maximised the value of the arts as tools of propaganda. As Mao Zedong said in 1942, \"To defeat the enemy we must rely primarily on the army with guns. But this army alone is not enough; we must also have a cultural army, which is absolutely indispensable for uniting our own ranks and defeating the enemy.\" The P.L.A. is one of the most important arts organizations in China. In Beijing, it has an arts university, opera house, opera, symphony orchestra, drama troupe and numerous bands. (New York Times)",
    "a": "Every year in China, the founding of the People's Liberation Army is remembered with major cultural celebrations.",
    "b": "Without the so-called cultural army, China would not be as united as it is today, nor as able to defeat its enemies.",
    "c": "In China, art is leveraged as a means of propaganda which, according to Mao Zedong, is essential for defeating the enemy.",
    "d": "China's Communist Party and P.L.A. have proven that art flourishes best when it is wedded to politics and national defence.",
    "correct": "C"
  },
  {
    "text": "Before the Euro Cup, the International Football Association Board (IFAB) gave the green light to try goal line sensors from two of 10 competing companies: GoalRef and Hawkeye. In early July, IFAB approved both technologies, althouph . they will remain optional. The distinction between these two technologies is that one is camera-based and one is not. And that difference could be the deciding factor. Unlike tennis, where there is almost never any thing or person obstructing the line of sight between the cameras and the ball, football presents unique challenges - especially during free kicks and corner kicks. In such situations, 10 players might be close to the goal, making it harder for cameras to unambiguously record when the ball passes the line. Not everyone is keen on goal line technology. Michel Platini, head of the UEFA, worried that introduction of this technology would begin a slippery slope toward more intrusions to the game, and he stood staunchly opposed to the technology. (s111ithsoanian111ag.cont)",
    "a": "The fact that the game of football presents chalenges that are different from tennis is of no consequence to goal line sensor technology.",
    "b": "While the IFAB approved the optional use of two types of goal line sensors, the move was not unanimously embraced.",
    "c": "Although the IFAB has approved the use of goal line sensors, the head of UEFA is opposed and may veto\" their use.",
    "d": "Tennis most likely favours the use of GoalRef's technology because the line of sight between the ball and the cameras is rarely blocked.",
    "correct": "B"
  },
  {
    "text": "A government investigation into insider trading in Tokyo has extended onto the trading floors of some of Wall Street's largest companies, including Goldman Sachs, UBS and Deutsche Bank. Regulators are scrutinising suspicious trading activity ahead of at least 12 public offering announcements over the last three years. The committee has been working with regulators to stiffen insider trading laws in Japan. Among the trades being investigated are those made by Goldman clients who bet against All Nippon Airways just days before the airline's stock offering last month. A company's share price typically drops when a new share issuance is announced. The commission is expected to issue an order and call for fundamental changes in the way the company, which is based in Tokyo, handles information. The scandal has further undermined faith in Japanese stock markets, experts say, which remain some of the world's most depressed after the global financial crisis. iNeui York Times)",
    "a": "In Tokyo, a government committee investiga¬tion into insider trading involves Goldman Sachs and Deutsche Bank.",
    "b": "Of all the cases, just one company; Deutsche Bank, has clients suspected of misconduct in betting against an airway company.",
    "c": "A .government investigation in Tokyo into insider trading will most likely result in more severe trading laws in Japan.",
    "d": "Suspicions of insider trading violations have caused Japanese stock markets to plunge in recent weeks.",
    "correct": "A"
  },
  {
    "text": "Drawing on research from psychology and linguistics, the researchers seek to better understand how using different languages to discuss and express emotions in a multilingual family might play an important role in children's emotional development. They propose that the particular language parents choose to use when discussing and expressing emotion can have significant impacts on children's emotional understanding, experience, and regulation. Research from linguistics suggests that when bilingual individuals switch languages, the way they experience emotions changes as well. Bilingual parents may use a specific language to express an emotional concept because they feel that the language provides a better cultural context for expressing the emotion. Overall, the authors argue that research from psychological science and linguistics suggests that a child's emotional competence is fundamentally shaped by a multilingual environment. (Science Daily)",
    "a": "Research indicates that due to cultural differ¬ences native Spanish speakers experience emotions more intensely than native Finnish speakers.",
    "b": "Research suggests that growing up in a multi-lingual home has minor impact on a child's emotional development.",
    "c": "Children who grow up with bilingual parents are better able to express their emotions compared to their peers.",
    "d": "The perception of some bilingual parents it is that one language may provide a better means for expressing a given emotion.",
    "correct": "D"
  },
  {
    "text": "The story about the first Penguin paperbacks may be apocryphal, but it is a good one. In 1935, Allen Lane, chairman of the eminent British publishing house Bodley Head, had a \"Eureka!\" moment: What if quality books were available at places like train stations and sold for reasonable prices - the price of a pack of cigarettes, say? Bodley Head did not want to finance his endeavour, so Lane used his own capital. He called his new house Penguin, apparently upon the suggestion of a secretary, and sent a young colleague to the zoo to sketch the bird. He then acquired the rights to ten reprints of serious literary titles and went knocking on non-bookstore doors. When Woolworth's placed an order for 63,500 copies, Lane first realised he had a viable financial model. Lane's paperbacks were cheap. They cost two and a half pence, the same as ten cigarettes, the publisher touted. Volume was key to profitability; Penguin had to sell 17,000 copies of each book to break even. (smithsoanianmag. coral",
    "a": "The key to Penguin's success was its advertising campaign comparing the price of a book to a pack of cigarettes.",
    "b": "Immediately after his -Eureka!\" moment about reasonably priced books, Lane saw that his financial model would succeed.",
    "c": "If Woolworth's had not placed an early order for 63,300 books, Penguin would never have succeeded as it did. ",
    "d": "After he had a -Eureka!\" moment, Lane financed Penguin books and initially acquired the rights to ten reprints.",
    "correct": "D"
  },
  {
    "text": "Born Agnes Bojaxhiu in 1910, Mother Teresa attended a convent-run primary school and then a state-run secondary school. The congregation made an annual pilgrimage to the chapel of the Madonna of Letnice atop Black Mountain in Skopje, and it was on one such trip at the age of twelve that Mother Teresa first felt a calling to a religious life. In 1928, an 18-year-old Agnes Bojaxhiu decided to become a nun and set off for Ireland to join the Loreto Sisters of Dublin. It was there that she took the name Sister Man' Teresa after Saint Therese of Lisieux. A year later, she travelled on to Darjeeling, India for the novitiate period; afterward she was sent to Calcutta, where she was assigned to teach at Saint Mary's High School for Girls, a school dedicated to teaching girls from the city's poorest Bengali families. Mother Teresa had to learn to speak both Bengali and Hindi fluently as she taught geography and history and dedicated herself to alleviating the girls' poverty through education. thiography.coml-",
    "a": "Had Agnes Bojathiu not joined her congrega-tion on a pilgrimage to Skopje. she might never have felt a religious calling. ",
    "b": "Agnes Bejaxhiu first took the name of Sister Mary Teresa on a trip to Darjeeling, India with the Loreto Sisters. ",
    "c": "Mother Teresa taught history and geography in Bengali and Hindi at Saint Mary's High School for Girls in Calcutta. ",
    "d": "After Agnes Boiaxhiu felt a religious calling, she became a nun and eventually travelled to Darjeeling and Calcutta and never left India again. ",
    "correct": "C"
  },
  {
    "text": "Prior to the 17th century, Ottoman succession had been governed by the \"law of fratricide\" drawn up by Mehmed 11 in the middle of the 15th century. Under the terms of this remarkable piece of legislation, whichever member of the ruling dynasty succeeded in seizing the throne on the death of the old sultan was not merely permitted, but enjoined, to murder all his brothers (together with any inconvenient uncles and cousins) in order to reduce the risk of subsequent rebellion and civil war. Although it was not invariably applied, Mehmed's law resulted in the deaths of at least SO members of the House of Osman over a period of 150 years. These victims included all 19 siblings of Sultan Mehmed 111 - some of whom were still infants at the breast, but all of whom were strangled with silk handkerchiefs Immediately after their brother's accession in 1595. Ismithsonianmag.con0 \n",
    "a": "Without the \"lawof fratricide\", chaos and coups would have reigned in the Ottoman empire between the 15th and 17th centuries. ",
    "b": "During the 15th century, the Ottoman Niehmed II instituted legislation that commanded a new ruler to commit fratricide. ",
    "c": "The murder of the 19 siblings of Sultan Nfehmed ill was the most appalling incident of fratricide in the Ottoman succession between the Nil and 17th centuries. ",
    "d": "Between the 15th and 17th centuries all family members of the new ruler were murdered in order to reduce the risk of subsequent rebellion and civil war.",
    "correct": "B"
  },
  {
    "text": "Twins offer a precious opportunity to untangle the influence of genes and the environment - of nature and nurture. Because identical twins come from a single fertilised egg that splits in two, they share virtually the same genetic code. Any differences between them -one twin haying younger looking skin, for example - must be due to environmental factors such as less time spent in the sun. Alternatively, by comparing the experiences of identical twins with those of fraternal twins, who come from separate eggs and share on average half their DNA, researchers can quantify the extent to which our genes affect our lives. If identical twins are more similar to each other with respect to an ailment than fraternal twins are, then vulnerability to the disease must be rooted at least in part in heredity. Lately. however, twin studies have helped lead scientists to a radical, almost heretical new conclusion: that nature and nurture are not the only elemental forces at work. (National Geographic) ",
    "a": "Fraternal twins are more suitable than identical twins for studying how our environment impacts our Ina:. ",
    "b": "Studies of identical and fraternal twins indicate that we are equally influenced by our genetics aid our environment. ",
    "c": "If one fraternal twin suffers from a disease white the other twin does not the cause of the disease is hereditary. ",
    "d": "Identical twins share nearly IOU per cent of their DNA while, on average. fraternal twins share 50 per cent of their DNA. ",
    "correct": "D"
  },
  {
    "text": "Economic growth and urbanisation go hand in hand and are critical to poverty reduction. Ultimately, cities provide both the living and working environment for most people in high-income countries, and an increasing number of middle income ones. Cities have the potential to reap major economies of scale. The United Kingdom has launched a three year programme of research funded by the World Bank and undertaken jointly h) London School of Economics and Oxford University. It will look at the development of city systems - the urban hierarchy within and across countries - and at urban form - the internal organisation of particular cities, focusing on Africa. The programme of research will aim to build a credible database documenting the speed, magnitude and form of urban development in selected countries. Once completed this data will establish the facts about urbanisation. It will also predict the determinants of and consequences of differing patterns of urban growth. (eco11omics.ox.oc.11k)",
    "a": "The research programme will help to antici-pate the causes and effects of different types of urban growth. ",
    "b": "Collaboration between academics and govern-ment officials in Africa will be required in order to collect the data on urban form. ",
    "c": "Urban growth is the primary driver of poverty reduction and this study aims to document the speed, size and form of urban development.",
    "d": "Most people live outside the city in high income countries, a pattern replicated across an increasing number of middle income countries.",
    "correct": "A"
  },
  {
    "text": "A new Internet-enabled power outlet wrll soon allow users to control household appliances via their smartphones and reduce their energy costs significantly. Soon there wilt be no need for special timers to switch lighting on and off or operate household appliances when the homeowner is absent. In the future, all of these things wil! be doable by means of a smartphone or PC thanks to Internet-enabled wireless power outlets that support the 1Pv6 Internet protocol. The wireless power outlets are a component of the HexaBus home automation system. \"The HexaBus components make the smart home of the future a reality. They enable household appliances to be controlled intelligently, thus optimizing or reducing electricity consumption. For example, the householder can start the washing machine during cheap-rate off-peak hours, or run the dishwasher hen the photovoltaic panels on the roof are generating sufficient power,\" says industrial engineer Mathias Dalheimer, (Scie,ice Dciily)",
    "a": "Homes equipped with Internet enabled power outlets will automatically optimize or reduce the household’s use of electricity without any human control",
    "b": "The HexaBus home auton1ation svsten1 will soon be installed in the majority of sn1art homes that support the IP,·6 Internet protocol.",
    "c": "Soon homeowners can start a load of laundry remotely with a smartphone or PC and Internet-enabled wireless power outlets.",
    "d": "When homeowners can control appliances and lighting from their smartphone or PC, energy consumption will drop.",
    "correct": "C"
  },
  {
    "text": "Not only are healthy organs in short supply but donor and patient also have\nto be closely matched, or the patient's immune system may reject the transplant. A new kind of solution is incubating\nin medical labs: \"bioartifidal'1 organs grown from the patient's own cells. Thirty people have received lab-grown bladders already, and other engineered organs are in the pipeline. Researchers take healthy cells from a patient's diseased bladder, cause them to multiply profusely in petri dishes, then apply them to a balloon-shaped scaffold made partly of collagen, the protein found in cartilage. Muscle cells go on the outside, urothelial cells (which line the urinary tract) on the inside. \"It's like baking a layer cake,\" says Atala. \"You're layering the cells one layer at a time, spreading these toppings.\" The bladder-to-be is then incubated at body temperature until the cells form functioning tissue. The whole process takes six to eight weeks. (National Geographic)",
    "a": "A lab-grown bioartificial bladder is made b _ layering urothelial cells around muscle cells.",
    "b": "To grow a bladder in a lab, researchers must take some of the patient's healthy collagen cells.",
    "c": "A lab-grown bioartificial bladder involves petri dishes, a scaffold, cell layering, and incubation.",
    "d": "After bladder cells are transferred to the scaf¬fold, they remain there for a period of three weeks.",
    "correct": "C"
  },
  {
    "text": "Recent studies indicate that the brain's insular cortex may help a sprinter drive his body forward just a little more efficiently than his competitors. This region may prepare a boxer to better fend off a punch his opponent is beginning\nto throw as well as assist a diver as she calculates her spinning body's position so she hits the water with barely a splash.\nThe insula does all this by anticipating an athlete's future feelings,. according to a new theory. Researchers suggest that an athlete possesses a hyper-attuned insula that can generate strikingly accurate predictions of how the body will feel\nin the next moment. That model of the body's future condition instructs other brain areas to initiate actions that are more tailored to coming demands than those of also-rans and couch potatoes. Emerging evidence now also suggests that this brain. area can be trained using a meditation technique called mindfulness - good news for Olympians and weekend warriors alike. tsmithsonianmag.comi\n",
    "a": "Research shows that the brain's insular cortex can be tuned only by physically practising a given sport or skill.",
    "b": "The insular cortex n1ay contribute to athletic excellence by anticipating how the physical bodv will soon feel.",
    "c": "Sprinters, boxers and divers are those athletes who benefit most from a hyper-attuned insular cortex.",
    "d": "Research indicates that, compared to boxers, athletes have larger insular cortexes.",
    "correct": "B"
  },
  {
    "text": "The British mathematician Alan Turing probed one of computing's biggest theoretical questions: Could machines possess a mind? If so, how would we know? In 1950, he proposed an experiment: If judges in typed conversations with a person and a computer programme couldn't tell them apart, we'd come to consider the machine as \"thinking.\" He predicted that programmes would be capable of fooling judges 30 per cent of the time by the year 2000. They came closest at the 2008 Loehner Prize competition when the top chatbot (as a human-mimicking programme is called) fooled 3 of 12 judges, or 25 per cent. Chatbots betray themselves in many ways, some subtle. They're unlikely to gracefully interrupt or be interrupted. Their responses, often cobbled together out of fragments of stored conversations, make sense at a local level but lack long-term coherence. (s111itliso ni t1111nag.co ,,, )",
    "a": "A chatbot tricked a quarter of the judges into thinking it was human at the 2008 Loebner Prize competition.",
    "b": "The absence of sustained logical consistency most frequently alerts Turing test judges that they are talking to a chatbot.",
    "c": "Turing's prediction that computers would trick people 30 per cent of the time by the year 1000 was proven correct. ",
    "d": "Within the next several years, chatbots will be able to adequately imitate how humans interrupt and are interrupted.",
    "correct": "A"
  },
  {
    "text": "The predominant theory of sleep is that the brain demands it. But the trick is to confirm this assumption with real data. How' does sleeping help the brain? The answer may depend on what kind of sleep you are talking about. Recentlv. researchers at Harvard tested underg;aduates on various aptitude tests, aUo,,·ed them to nap, then tested them again. They found that those who had engaged in RE~1 sleep subsequentl_ performed better in pattern recognition tasks, such as grammar, while those who slept deeply were better at memorisation. Other researchers have found that the sleeping brain appears to repeat a pattern of neuron firing that occurred while the subject was recently awake, as if in sleep the brain were trying to commit to long-term memory what it had learned that day. Yet another study showed that the sleeping brain seems to weed out redundant or unnecessary synapses or connections. So the purpose of sleep may be to help us remember what's important by letting us forget what's :not. tNational Geographic",
    "a": "According to the study referenced, REM sleep is, the most valuable in assisting memorisation.",
    "b": "The patterned neuron firing that occurs during REM sleep facilitates long-term memory.",
    "c": "Removing unneeded synapses while asleep allows us to recognize patterns while awake.",
    "d": "Some research shows that sleep may facilitate er pattern recognition and memory.",
    "correct": "D"
  },
  {
    "text": "Bingo Friendzy, developed by 'the British online gambling company Gamesys, was introduced on Facebook this morning. It allows players to stake cash in 90 bingo and slot machine games. The app is marketed with cartoon graphics featuring characters that have been compared to those on Moshi Monsters, the popular children's social network. It has prompted anger from Christian groups, who called on the Advertising Standards Authority to act. Facebook has allowed the first real gambling app as it comes under unprecedented pressure to increase its revenues. Since its flotation in May the firm has reported a $157m loss and its shares have almost halved in value amid concerns about Facebook's effectiveness as an advertising medium. Facebook will take 30 per cent of revenues from Bingo Friendzv and a host of other gambling apps expected to be introduced in the coming months. (Daily Telegraph)",
    "a": "Christian groups angered by Bingo Friendzv believe that children should not be exposed to the sin of gambling.",
    "b": "Facebook will not benefit financially from Bingo Friendzy or any other gambling app to appear on the site.",
    "c": "Face book shares lost half their value primarily because investors do not have faith in the company's advertising.",
    "d": "Bingo Friendzv appeared on Facebook at a time when the company was suffering from economic loss.",
    "correct": "D"
  },
  {
    "text": "At least 10 million of the world's poorest people are set to go hungry this year because of failing crops caused by one of the strongest El Nino climatic events on record, Oxfam, the charity, has warned. The charity said several countries were already facing a \"major emergency\", such as Ethiopia, where 4.5 million are in\nneed of food aid because of a prolonged scarcity of rain this year. Floods, followed by drought, have slashed Malawi's maize production by more than a quarter, farmers in central America have suffered from two years of drought and El Nino conditions have already reduced the Asian monsoon over India, potentially triggering a wider drought across the east of the continent. El Nino is a periodic climatic phenomenon where waters of the eastern tropical Pacif ic warm, triggering a range of potential consequences for global weather. While parts of South America are typically doused in heavy rainfall, warmer, drought-like conditions are experienced in Australia, south-east Asia and southern Africa. (tlreguardian. com)",
    "a": "El Nino is an annual event where waters ofthe eastern tropical Pacific warm up. causing a range of consequences in the weather. ",
    "b": "The results of El Nino include floods and droughts and the effects can he observed in Malawi, India and South America, among others. ",
    "c": "4.5 million people in Ethiopia are in need of food aid because of initial floods and then a prolonged scarcity of rain, worsened by El Nino. ",
    "d": "All countries effected by El Nino first experience heavy floods and then a drought.",
    "correct": "B"
  },
  {
    "text": "Thomas. or Doubting Thomas as he is commonly known, was one of the \"Twelve Apostles\", disciples sent out after Christ's Crucifixion to spread the newborn faith. He was joined by Peter, Andrew, James the Greater, James the Lesser, John, Philip, Bartholon1ew, Matthew, Thaddaeus, Simon - and Matthias, who replaced the former disciple and alleged traitor, Judas Iscariot. In time the terms \"apostle\" and \"apostolic\" (derived from the Greek apostolos, or messenger) were applied to others who spread the word. In the case of Paul, he claimed the title of apostle for himself, believing he had seen the Lord and received a spiritual commission from him. Mary Magdalene is known as the apostle to the Apostles for her role of announcing the resurrection to them. Although only two of the four Evangelists - Matthew and John - were amongst the original Apostles, Mark and Luke are considered apostolic because of the importance of their work in writing the New Testament Gospels. (National Geographic)",
    "a": "For at least a century following the crucifixion, the word \"apostle\" was only used in reference to Christ's twelve disciples.",
    "b": "Simon, Philip and Mary Magdalens are all considered apostles, a term that traces to the Greek word meaning messenger.",
    "c": "Despite their contributions to the New Testament, some conservative\\'e Christians still do not consider Mark and Luke to be apostles.",
    "d": "The twelve apostles are Thomas, Peter, Andrew, James the Greater, James the Lesser, John, Philip, Bartholomew, Matthew, Thaddaeus, Simon, and Judas Iscariot.",
    "correct": "B"
  },
  {
    "text": "The 17th century Dutch painter Frans Hats made two great contributions. One was to combine an intense sense of realism ,with flamboyant brushwork ,which gives his work a highly personal quality. Hals' other contribution is to fill his paintings with evident psychological intensity, the quality .known as ''psychological insight.\" His figures feel as if we could speak to them. It's surely no accident that Hals's life (1580-lbob) overlapped with that of Shakespeare (1564-1616), and the way he evoked a sense of character provides interesting parallels to the characters in Shakespeare's plays who are generally two or more people in one body, engaged in internal dialogue. In that sense, Hals's portraits document the emergence of the modern self: they display a new awareness that the \"self\" is not a single, uniform thing, but the product of conflicting forces and disparate impulses, ruled by a consciousness filled with self¬doubt. \n",
    "a": "Frans Hals' use of subtle brushwork in his paint-ings convevcd his impression of the people h painted.",
    "b": "Frans Hals's paintings have been described as conveying ,1 sense of realism along with psychological insight.",
    "c": "In his portraits, Frans Hals intentionally tried to impart a sense of the modern self, riddled with cornplexity and doubt.",
    "d": "Hals frequently attended performances of Shakespeare's plays, and the bard's influence on his painting is obvious,",
    "correct": "B"
  },
  {
    "text": "A new genetic analysis has reconstructed the history of North Africa's Jews, showing that these populations date to biblical-era Israel and are not largely the descendants of natives who converted to Judaism. The study also shows that these Jews form two distinct groups, one of which is more closely related than the other to their European counterparts, reflecting historical migrations. The findings are the latest in a series of genetic studies, which began in the 1990s, indicating that the world's Jews share biological roots, not just cultural and religious ties. In many cases the analyses have confirmed what scholars had gleaned from archaeological finds and historical accounts. The scientists found that the Jewish populations of North Africa became genetically distinct over time, with those of each country carrying their own DNA signatures. This suggests they mostly married within their own religious and cultural group. (Science Daily)",
    "a": "Genetic analysis shows that the ancestors of North African Jews share biological roots with at least two other groups. ",
    "b": "Forced segregation prevented the Jews of North Africa from marrying outside their culture and religion. ",
    "c": "Country-specific Jewish populations in North Africa each have their own unique genetic markers. ",
    "d": "Studies consistently show that while Jews are culturally and religiously similar, they are biologically dissimilar. ",
    "correct": "C"
  },
  {
    "text": "Paris has a deeper and stranger connection to its underground than almost any city, and that underground is one of the richest. The arteries and intestines of Paris, the hundreds of miles of tunnels that make up some of the oldest and densest subway and sewer networks in the world, are just the start of it. Under Paris there are spaces of all kinds: canals and reservoirs, crypts and bank vaults, wine cellars transformed into nightclubs and galleries. Most surprising of all are the carrieres - the old limestone quarries that fan out in a deep and intricate web under many neighbourhoods, mostly in the southern part of the metropolis. Into the 19th century those caverns and tunnels were mined for building stone. After that farmers raised mushrooms in them, at one point producing hundreds of tons a year. During World War II, French Resistance fighters - the underground - hid in some quarries; the Germans built bunkers in others. (National Geographic) ",
    "a": "Underground limestone mining was primarily carried out under the northern part of Paris into the 19th century. ",
    "b": "Today, anyone is welcome to visit the many galleries, nightclubs, and other establishments underneath Paris.",
    "c": "Underneath Paris, one can find carrieres, bank vaults, galleries, sewers, nightclubs, tunnels, crypts, and caverns",
    "d": "At one point in Paris' history, the tons of mush-rooms produced beneath ground were most likely more than the amount produced above ground. ",
    "correct": "C"
  },
  {
    "text": "More than 200,000 individual animal species, by varying strategies, help flowers make more flowers. Flies and beetles are the original pollinators, going back to when flowering plants first appeared 130 million years ago. As for bees, scientists have identified some 20,000 distinct species so far, and about one-fifth of those pollinate flowers in the United States. Hummingbirds, butterflies, moths, wasps, and ants are also up to the task. Snails and slugs smear pollen as they slide over flower clusters. Mosquitoes carry pollen for batches of orchids, and bats, with diverse muzzles and tongues adapted to tap differently shaped blossoms, move pollen for 360 plants in the Americas alone. Flowering plants — there are more than 240,000 species of them — have evolved in step with their pollinators, using sweet scents and bright colours to lure with the promise of a meal. Flower receptacles are wonderfully varied, from tubes and gullets to flaps, brushes, and spurs. (National Geographic)",
    "a": "At the time plants began flowering on the planet 130 million years ago, among others flies, beetles, bees and bats spread their pollen. ",
    "b": "More than 240,000 species of flowering plants are pollinated by more than 200,000 animal species, including ants and bats",
    "c": "Hundreds of plants have evolved to match the tongue shape of some bat species that pollinate them. ",
    "d": "While beetles, snails, and bees all serve to pollinate plants, only the mosquito can carry pollen for orchids. ",
    "correct": "B"
  },
  {
    "text": "The income stagnation of the last decade stems, in the simplest terms, from two factors: a slowdown in economic growth and a rise in inequality, which has concentrated the economy's modest gains among a small share of the population. The economy's recent struggles began in late 2001, when a relatively mild recession ended and a new expansion began. The problem with this new recovery was that it wasn't especially strong. In addition to slow growth, the bounty from the economy's growth has largely flowed to a small slice of the population: the affluent. Since 2000, no income group has done particularly well. Income in households that rely on wages has failed to keep pace with inflation, while in households that have large investment holdings the value of many of those holdings - both real estate and stocks - has fallen. (New York Times) ",
    "a": "Although the rich have benefited from recent economic gains, no income group has flour-ished since 2000. ",
    "b": "Over the past decade, individuals with invest-ment holdings in stocks and real estate have experienced only gains. ",
    "c": "The slow growth accompanying the weak economic recovery in 2001 did not contribute to current troubles. ",
    "d": "A faster rate of economic growth would allow even modest gains to flow more evenly among income groups. ",
    "correct": "A"
  },
  {
    "text": "The oldest extant play and the only surviving Greek tragedy about a contemporaneous (rather than mythological) topic, The Persians was written by Aeschylus in 472 BC. The play chronicles the 480 BC Battle of Salamis, one of the most significant battles in world history: As the turning point in the Persian Empire's downfall, it allowed the Greeks - and therefore the West's first experiment with democracy - to survive. Aeschylus, a veteran of the Persian Wars, also made the unusual choice of recounting the battle from the Persian perspective, creating what's generally seen as an empathetic, rather than triumphalist, narrative of their loss. Today, the play is unexpectedly trendy. It has been produced about 30 times over the last five years. Why? Consider the plot: a superpower's inexperienced, hubristic leader - who hopes to conquer a minor enemy his father tried unsuccessfully to fell a decade earlier - charges into a doomed military invasion. (smithsonianmag. corn) ",
    "a": "The Persians has enjoyed a renaissance in recent years because of its insight into the history of the Persian Empire. ",
    "b": "In The Persians, Greek playwright Aeschylus tells of the Battle of Salamis from the Greek point of view.",
    "c": "The Persians is popular with contemporary audiences because it proves that history repeats itself.",
    "d": "Aeschylus, who fought in the Persian Wars, provides an empathetic account of how the Persians lost the Battle of Salamis in 480 BC.",
    "correct": "D"
  },
  {
    "text": "We now know that Stonehenge was in the making for at least 400 years. The first phase, built around 3000 BC, was a simple circular earthwork enclosure similar to many \"henges\" (sacred enclosures typically comprising a circular bank and a ditch) found throughout the British Isles. Around 2800 BC, timber posts were erected within the enclosure. Archaeologists have long believed that Stonehenge began to take on its modern form two centuries later, when large stones were brought to the site in the third and final stage of its construction. The first to be put in place were the 80 or so bluestones, which were arranged in a double circle with an entrance facing northeast. The importance of the bluestones is underscored by the immense effort involved in moving them a long distance - some were as long as three metres and weighed four tons. Geological studies in the 1920s determined that they came from the Preseli Mountains in southwest Wales, 140 miles from Stonehenge. (smithsonianmag.com) ",
    "a": "Stonehenge was constructed in two main stages: first it was a circle-shaped enclosure and then the large stones were added.",
    "b": "Research suggests that the bluestones of Stonehenge were moved from their source 140 miles away using only manpower.",
    "c": "According to archaeologists, the bluestones of Stonehenge were added to the structure around 2800 sc. ",
    "d": "Around 2600 sc, bluestones from southwest Wales were added to the Stonehenge site in a double circle. ",
    "correct": "D"
  },
  {
    "text": "Children who think their parents are poor monitors or nag a lot tend to play videogames more than other kids, according to a study funded by the National Science Foundation. The study is one of the first to link parental behaviour to kids' videogame playing. The researchers surveyed more than 500 students from 20 middle schools and found that the more children perceived their parents' behaviour as negative (e.g., \"nags a lot\") and the less monitoring parents did, the more the children played videogames. The next step, said lead researcher Linda Jackson, is to find out what's fueling children's videogame behaviour - a topic Jackson and her team plan to examine. Jackson said an equally interesting question is the relationship between videogame playing and actual rather than perceived behaviour of parents. Perceptions don't always mirror reality, she said, and this may be the case in the child-parent relationship. (ScienceDaily)",
    "a": "According to a study, children play more videogames if they perceive that they have parents who closely supervise them.",
    "b": "Videogame playing causes children to interpret their parents' behaviour toward them as negative.",
    "c": "According to a study, children who think their parents pester them a lot play more videogames.",
    "d": "Research shows that children who play a lot of videogames are less likely to have parents who behave positively.",
    "correct": "C"
  },
  {
    "text": "Walking upright on two legs is the trait that defines the hominid lineage: Bipedalism separated the first hominids from the rest of the four-legged apes. It took a while for anthropologists to realise this. At the turn of the 20th century, scientists thought that big brains made hominids unique. This was a reasonable conclusion since the only known hominid fossils were of brainy species - Neanderthals and Homo erectus. In more recent decades, anthropologists have determined that bipedalism has very ancient roots. The earliest hominid with the most extensive evidence for bipedalism is the 4.4-million-year-old Ardipithecus ramidus. Although the earliest hominids were capable of upright walking, they retained primitive features - such as long, curved fingers and toes as well as longer arms and shorter legs - that indicate they spent time in trees. It's not until the emergence of H. erectus 1.89 million years ago that hominids grew tall, evolved long legs and became completely terrestrial creatures. (smithsonianmag. com)",
    "a": "Fossils indicate that Ardipithecus ramidus became the first fully bipedal and terrestrial species 4.4 million years ago.",
    "b": "Fossils of Neanderthals suggest that the hominid species walked upright but was better at climbing trees.",
    "c": "Hominid species with shorter legs, longer arms, and fingers and toes that curl likely spent at least some time in trees.",
    "d": "Hominid species developed bigger brains just after they walked upright - around 4.4 million years ago.",
    "correct": "C"
  },
  {
    "text": "In the warfare that raged in Cambodia from 1970 until 1998, all sides used land mines. There are more than 30 different types. Villagers have prosaic names for them based on their appearance: the frog, the drum, the corncob. Most were manufactured in China, Russia, or Vietnam, a few in the United States. Khmer Rouge commander Pol Pot, whose regime was responsible for the deaths of some 1.7 million Cambodians between 1975 and 1979, purportedly called land mines his \"perfect soldiers.\" They never sleep. Although weapons of war, land mines are unlike bullets and bombs in two distinct ways. First, they are designed to maim rather than kill, because an injured soldier requires the help of two or three others, reducing the enemy's forces. Second, and most sinister, when a war ends, land mines remain in the ground, primed to explode. Only 25 per cent of land mine victims around the world are soldiers. The rest are civilians - boys gathering firewood, mothers sowing rice, girls herding goats. (National Geographic)",
    "a": "Land mines are different from some other weapons of war in that their intent is not to kill but to disable.",
    "b": "In Cambodia between 1975 and 1979, 75 per cent of land mine victims were civilians.",
    "c": "\"Perfect soldiers\" is one of many names that only Cambodian villagers use to describe land mines.",
    "d": "As weapons of war, land mines are successful at reducing soldier forces bullets or bombs.",
    "correct": "A"
  },
  {
    "text": "Our working memory capacity is  decidedly finite — it reflects our ability to focus and control attention and strongly influences our ability to solve problems. Converging evidence from many psychological science studies suggests that high working memory capacity is associated with better performance at mathematical problem-solving. In fact, decreased working memory capacity may be one reason why math anxiety leads to poor math performance. Overall, working memory capacity seems to help analytical problem-solvers focus their attention and resist distraction. However, these very features of working memory capacity seem to impair creative problem-solving. With creative problems, reaching a solution may require an original approach or a novel combination of diverse pieces of information. As a result, too much focus may actually impair creative problem solving. (Science Daily) ",
    "a": "Scientific studies suggest that people who tend to he anxious are better able to solve problems creatively.",
    "b": "Scientific evidence indicates that a razor-sharp focus likely helps people to creatively solve problems. ",
    "c": "A high working memory capacity is associated with the capacity to focus is limited and solve mathematical problems ",
    "d": "While our working memory capacity is limited, our ability to find creative solutions to problems is unlimited. ",
    "correct": "A"
  },
  {
    "text": "The explosion of personal devices with built in web connectivity, office applications and email can improve working practices but also comes with risks not limited to time wasting. The portability, connectivity, and storage capacity of mobile devices means they bring, with them the threat ni data leakage, data theft, and the introduction 01 viruses or other malware into workplace computing systems. Portable storage devices of every ilk whether mp3 player, tablet or mobile phone now have several ways Of connecting to other devices and net works including Wi-Fl, Bluetooth, and USB. Many of these devices also now have several gigabytes of storage capacity and are often expandable and so have the ability to capture vast quantities of data, whether for legitimate work purposes or for illicit use. Many businesses and organisations are rightly concerned about the loss or disclosure of intellectual property or sensitive information about customers and employees. (Science Daily)",
    "a": "Businesses that issue mobile devices to employees face just two risks: data theft and potential loss of productivity.",
    "b": "Before the appearance of the mobile devices with vast storage capacity the threat of data leakage and data theft was minimal.",
    "c": "Personal technology devices like mobile phones and tablets can compromise privacy and spread viruses and malware. ",
    "d": "Portable storage devices with the most storage capacity put businesses and organisations most at risk of malware attacks.",
    "correct": "C"
  },
  {
    "text": " In northern Europe, public opinion is increasingly exasperated by what many view as an attempt by the south to rob it of its savings. A recent letter signed by 160 German economists claiming that the European Union's plan for a banking union was little more than an attempt to make Germany pay for Spanish mistakes is revealing in this respect. In turn, southern Europe is getting angry. One man saw this coming. American economist Martin Feldstein wrote in 1997 that monetary union would create conflict within Europe. Unfortunately, his insight was correct: European countries today are at loggerheads not despite the common currency but precisely because of it. History suggests that international disputes over debt and transfers are a serious danger. In the 1920s and the I930s, representatives of European states devoted countless meetings to resolving them (at the time, mainly German reparations). Despite US goodwiII, they were unable to overcome their differences. (Ne► lorA Times) ",
    "a": "Sharing a common currency is the main and only factor contribution to quarrels between northern and southern Europe ",
    "b": "Some economists in northern Europe believe their countries are being forced to pay for mistakes made by southern Europe.",
    "c": "In the 1920s and 1930s, European state representative’s resolved international debt disagreements.",
    "d": "The common currency in Europe is a source of trouble because of inherent inequalities between north and south.",
    "correct": "B"
  },
  {
    "text": "The Roman Catholic Sagrada Familia has always been revered and reviled. The surrealists claimed architect Antoni Gaudi as one of their own, while George Orwell called the church \"one of the most hideous buildings in the world.\" As idiosyncratic as Gaudi himself, it is a vision inspired by the architect's religious faith and love of nature. He understood that the natural world is rife with curved forms, not straight lines. And he noticed that natural construction tends to favour sinewy materials such as wood, muscle, and tendon. With these organic models in mind, Gaudi based his buildings on a simple premise: If nature is the work of God, and if architectural forms are derived from nature, then the best way to honour God is to design buildings based on his work. Gaudi's faith was his own. But his belief in the beautiful efficiency of natural engineering clearly anticipated the modem science of biomimetics. (National Geographic)",
    "a": "The design of Antoni Gaudi's Sagrada Familia is intended to bring nature into the church.",
    "b": "Antoni Gaudi's Sagrada Familia directly influenced the modern field of biomimetics.",
    "c": "Antoni Gaudi's Sagrada Familia incorporates wood, rounded lines, and sinewy effects",
    "d": "Antoni Gaudi drew· inspiration from his religious faith and the forms he saw in nature.",
    "correct": "D"
  },
  {
    "text": "In the realm of the spirit world, the mask is more than mere facade. It is utterly transformative. The man in the mask - and it is nearly always a man - may speak in a different voice, move differently, behave differently, because ~e is a different being. The masked man 1s not playing a role. He becomes the role. The mask is the centrepiece of a costume, often with props, that the wearer carries during a masquerade, a ritual ceremony performed before a community. Some masquerades a.re entertainment - a parade, for example, or a dance that reinforces the cultural identity of a community. Others remain embedded in religious or social ritual. In these performances the masquerader may serve as a kind of moral policeman: instructing, punishing, maintaining and restoring order, or presiding over a passage - boy to man, citizen to leader, planting to harvest. The origins of masking may reside, art historian Herbert M. Cole suggests, in hunting rituals. (National Geographic)",
    "a": "Masquerades are performed for the sole benefit of the masquerader.",
    "b": "Masks are most often used in the context of religious ceremonies.",
    "c": "In a spiritual milieu, a masked man is seen as performing a role.",
    "d": "Masks may serve to entertain, maintain order, instruct, and transform.",
    "correct": "D"
  },
  {
    "text": "The antibacterial substance triclosan, which was first developed in the 1960s\nto prevent bacterial infections in hospitals, has since been incorporated into everything from hand soaps to toothpastes to mouthwashes and toys. Manufacturers see it as a marketing bonus, increasing consumer confidence that a particular product kills harmful bacteria. In recent years, though, research has shed light on a number of problems with employing tridosan so widely. Studies have shown that the chemical\ncan disrupt the endocrine systems of several different animals, binding to receptor sites in the body, which prevents the thyroid hormone from functioning normally. Additionally, triclosan penetrates the skin and enters the bloodstream more easily than previously thought, and has turned up everywhere from aquatic environments to human breast milk in troubling quantities. To this list of concerns, add one more: A new paper indicates that triclosan impairs muscle function in both animals and humans. tsmithsonianmag.comt",
    "a": "Consumers are more confident in a product's antibacterial qualities when triclosan is listed as an ingredient.",
    "b": "People who use products that contain triclossan face a higher risk of developing conditions of the endocrine system",
    "c": "Triclosan interferes with the proper function of muscles and the thyroid and has been found in human breast milk",
    "d": "The intended purpose of developing the antibacterial triclosan in the 60s was to treat infection in hospitals",
    "correct": "C"
  }
];