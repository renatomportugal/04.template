const { scaleLinear, scaleOrdinal, extent, range, schemeBlues } = d3;

// data describing the men and women awarded a world championship, for every recorded competition
// source https://www.worldsurfleague.com/pages/history
const data = [
{
  year: '2019',
  men: {
    name: 'Italo Ferreira',
    country: 'Brazil' },

  women: {
    name: 'Carissa Moore',
    country: 'Hawaii' } },


{
  year: '2018',
  men: {
    name: 'Gabriel Medina',
    country: 'Brazil' },

  women: {
    name: 'Stephanie Gilmore',
    country: 'Australia' } },


{
  year: '2017',
  men: {
    name: 'John John Florence',
    country: 'Hawaii' },

  women: {
    name: 'Tyler Wright',
    country: 'Australia' } },


{
  year: '2016',
  men: {
    name: 'John John Florence',
    country: 'Hawaii' },

  women: {
    name: 'Tyler Wright',
    country: 'Australia' } },


{
  year: '2015',
  men: {
    name: 'Adriano de Souza',
    country: 'Brazil' },

  women: {
    name: 'Carissa Moore',
    country: 'Hawaii' } },


{
  year: '2014',
  men: {
    name: 'Gabriel Medina',
    country: 'Brazil' },

  women: {
    name: 'Stephanie Gilmore',
    country: 'Australia' } },


{
  year: '2013',
  men: {
    name: 'Mick Fanning',
    country: 'Australia' },

  women: {
    name: 'Carissa Moore',
    country: 'Hawaii' } },


{
  year: '2012',
  men: {
    name: 'Joel Parkinson',
    country: 'Australia' },

  women: {
    name: 'Stephanie Gilmore',
    country: 'Australia' } },


{
  year: '2011',
  men: {
    name: 'Kelly Slater',
    country: 'USA' },

  women: {
    name: 'Carissa Moore',
    country: 'Hawaii' } },


{
  year: '2010',
  men: {
    name: 'Kelly Slater',
    country: 'USA' },

  women: {
    name: 'Stephanie Gilmore',
    country: 'Australia' } },


{
  year: '2009',
  men: {
    name: 'Mick Fanning',
    country: 'Australia' },

  women: {
    name: 'Stephanie Gilmore',
    country: 'Australia' } },


{
  year: '2008',
  men: {
    name: 'Kelly Slater',
    country: 'USA' },

  women: {
    name: 'Stephanie Gilmore',
    country: 'Australia' } },


{
  year: '2007',
  men: {
    name: 'Mick Fanning',
    country: 'Australia' },

  women: {
    name: 'Stephanie Gilmore',
    country: 'Australia' } },


{
  year: '2006',
  men: {
    name: 'Kelly Slater',
    country: 'USA' },

  women: {
    name: 'Layne Beachley',
    country: 'Australia' } },


{
  year: '2005',
  men: {
    name: 'Kelly Slater',
    country: 'USA' },

  women: {
    name: 'Chelsea Georgeson',
    country: 'Australia' } },


{
  year: '2004',
  men: {
    name: 'Andy Irons',
    country: 'Hawaii' },

  women: {
    name: 'Sofia Mulanovich',
    country: 'Peru' } },


{
  year: '2003',
  men: {
    name: 'Andy Irons',
    country: 'Hawaii' },

  women: {
    name: 'Layne Beachley',
    country: 'Australia' } },


{
  year: '2002',
  men: {
    name: 'Andy Irons',
    country: 'Hawaii' },

  women: {
    name: 'Layne Beachley',
    country: 'Australia' } },


{
  year: '2001',
  men: {
    name: 'C. J. Hobgood',
    country: 'USA' },

  women: {
    name: 'Layne Beachley',
    country: 'Australia' } },


{
  year: '2000',
  men: {
    name: 'Sunny Garcia',
    country: 'Hawaii' },

  women: {
    name: 'Layne Beachley',
    country: 'Australia' } },


{
  year: '1999',
  men: {
    name: 'Mark Occhilupo',
    country: 'Australia' },

  women: {
    name: 'Layne Beachley',
    country: 'Australia' } },


{
  year: '1998',
  men: {
    name: 'Kelly Slater',
    country: 'USA' },

  women: {
    name: 'Layne Beachley',
    country: 'Australia' } },


{
  year: '1997',
  men: {
    name: 'Kelly Slater',
    country: 'USA' },

  women: {
    name: 'Lisa Andersen',
    country: 'USA' } },


{
  year: '1996',
  men: {
    name: 'Kelly Slater',
    country: 'USA' },

  women: {
    name: 'Lisa Andersen',
    country: 'USA' } },


{
  year: '1995',
  men: {
    name: 'Kelly Slater',
    country: 'USA' },

  women: {
    name: 'Lisa Andersen',
    country: 'USA' } },


{
  year: '1994',
  men: {
    name: 'Kelly Slater',
    country: 'USA' },

  women: {
    name: 'Lisa Andersen',
    country: 'USA' } },


{
  year: '1993',
  men: {
    name: 'Derek Ho',
    country: 'Hawaii' },

  women: {
    name: 'Pauline Menczer',
    country: 'Australia' } },


{
  year: '1992',
  men: {
    name: 'Kelly Slater',
    country: 'USA' },

  women: {
    name: 'Wendy Botha',
    country: 'Australia' } },


{
  year: '1991',
  men: {
    name: 'Damien Hardman',
    country: 'Australia' },

  women: {
    name: 'Wendy Botha',
    country: 'Australia' } },


{
  year: '1990',
  men: {
    name: 'Tom Curren',
    country: 'USA' },

  women: {
    name: 'Pam Burridge',
    country: 'Australia' } },


{
  year: '1989',
  men: {
    name: 'Martin Potte',
    country: 'UK' },

  women: {
    name: 'Wendy Botha',
    country: 'Australia' } },


{
  year: '1988',
  men: {
    name: 'Barton Lynch',
    country: 'Australia' },

  women: {
    name: 'Freida Zamba',
    country: 'USA' } },


{
  year: '1987',
  men: {
    name: 'Damien Hardman',
    country: 'Australia' },

  women: {
    name: 'Wendy Botha',
    country: 'South Africa' } },


{
  year: '1986',
  men: {
    name: 'Tom Curren',
    country: 'USA' },

  women: {
    name: 'Freida Zamba',
    country: 'USA' } },


{
  year: '1985',
  men: {
    name: 'Tom Curren',
    country: 'USA' },

  women: {
    name: 'Freida Zamba',
    country: 'USA' } },


{
  year: '1984',
  men: {
    name: 'Tom Carroll',
    country: 'Australia' },

  women: {
    name: 'Freida Zamba',
    country: 'USA' } },


{
  year: '1983',
  men: {
    name: 'Tom Carroll',
    country: 'Australia' },

  women: {
    name: 'Kim Mearig',
    country: 'USA' } },


{
  year: '1982',
  men: {
    name: 'Mark Richards',
    country: 'Australia' },

  women: {
    name: 'Debbie Beacham',
    country: 'USA' } },


{
  year: '1981',
  men: {
    name: 'Mark Richards',
    country: 'Australia' },

  women: {
    name: 'Margo Oberg',
    country: 'Hawaii' } },


{
  year: '1980',
  men: {
    name: 'Mark Richards',
    country: 'Australia' },

  women: {
    name: 'Margo Oberg',
    country: 'Hawaii' } },


{
  year: '1979',
  men: {
    name: 'Mark Richards',
    country: 'Australia' },

  women: {
    name: 'Lynn Boyer',
    country: 'Hawaii' } },


{
  year: '1978',
  men: {
    name: 'Wayne Bartholomew',
    country: 'Australia' },

  women: {
    name: 'Lynn Boyer',
    country: 'Hawaii' } },


{
  year: '1977',
  men: {
    name: 'Shaun Tomson',
    country: 'South Africa' },

  women: {
    name: 'Margo Oberg',
    country: 'Hawaii' } },


{
  year: '1976',
  men: {
    name: 'Peter Townend',
    country: 'Australia' },

  women: {
    name: '',
    country: '' } },


{
  year: '1975',
  men: {
    name: 'Mark Richards',
    country: 'Australia' },

  women: {
    name: '',
    country: '' } },


{
  year: '1974',
  men: {
    name: 'Reno Abellira',
    country: 'USA' },

  women: {
    name: '',
    country: '' } },


{
  year: '1973',
  men: {
    name: 'Ian Cairns',
    country: 'Australia' },

  women: {
    name: '',
    country: '' } },


{
  year: '1972',
  men: {
    name: 'James Blears',
    country: 'USA' },

  women: {
    name: 'Sharon Webber',
    country: 'USA' } },


{
  year: '1970',
  men: {
    name: 'Rolf Aurness',
    country: 'USA' },

  women: {
    name: 'Sharon Webber',
    country: 'USA' } },


{
  year: '1968',
  men: {
    name: 'Fred Hemmings',
    country: 'USA' },

  women: {
    name: 'Margo Godfrey',
    country: 'USA' } },


{
  year: '1966',
  men: {
    name: 'Nat Young',
    country: 'Australia' },

  women: {
    name: 'Joyce Hoffman',
    country: 'USA' } },


{
  year: '1965',
  men: {
    name: 'Felipe Pomar',
    country: 'Peru' },

  women: {
    name: 'Joyce Hoffman',
    country: 'USA' } },


{
  year: '1964',
  men: {
    name: 'Midget Farrelly',
    country: 'Australia' },

  women: {
    name: "Phyllis O'Donnell",
    country: 'Australia' } }];





/* the idea is to show the text and illustration in two different layouts
                               - by default in a row, showing the SVG graphic first
                               - when the viewport is thinner than a predefined threshold, in a column, with the SVG following the text
                               */
const Visualization = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse;
  min-height: 100vh;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    max-width: 600px;
    margin: 1rem auto 0;
    width: 90vw;
    justify-content: space-between;

    & > * + * {
      margin-top: 1rem;
    }

  }
`;


const Main = styled.main`
  max-width: 400px;
  padding: 1rem;
  background: hsl(0, 0%, 100%);
  color: hsl(220, 90%, 5%);

  & > * + * {
    margin-top: 1rem;
  }
`;
const Heading = styled.h1`
  font-family: "Dosis", sans-serif;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid currentColor;
`;
const List = styled.ul`
  list-style-position: inside;
  line-height: 2;
`;
const Source = styled.p`
  font-size: 0.9rem;

  a {
    text-decoration-style: dotted;
    color: inherit;
    font-style: italic;
  }
`;

// position the SVG at the very bottom of the page
const Illustration = styled.svg`
  width: 100%;
  max-width: 600px;
  height: auto;
  display: block;
  font-family: "Dosis", sans-serif;
  align-self: flex-end;
`;



function App() {
  /* data massaging part 1
                desired data structure: an array describing the country and championships awarded
                {
                  country
                  value
                }
                */

  // array describing the countries for each year year, considering both mens and women' competitions
  const countries = data.
  reduce((acc, curr) => {
    const { country: countryMen } = curr.men;
    const { country: countryWomen } = curr.women;
    return [...acc, countryMen, countryWomen];
  }, []);

  // array describing an object for each unique country
  const championships = countries.
  reduce((acc, curr) => {
    const index = acc.findIndex(({ country }) => country === curr);
    if (index !== -1) {
      acc[index].value += 1;
      return acc;
    }
    return [...acc, {
      country: curr,
      value: 1 }];

  }, []);

  // array collapsing duplicate objects with the same value into one and sorting the objects by value
  const dataChampionships = championships.
  reduce((acc, curr) => {
    const index = acc.findIndex(({ value }) => value === curr.value);
    if (index !== -1) {
      acc[index].country += ` & ${curr.country}`;
      return acc;
    }
    return [...acc, {
      country: curr.country,
      value: curr.value }];

  }, [])
  // sort in descending order
  .sort(({ value: vA }, { value: vB }) => vA > vB ? -1 : 1);


  /* data massaging part 2
                                                             desired data structure: an array describing the championships awarded to individual athletes
                                                             */
  const athletes = data.
  reduce((acc, curr) => {
    const { name: nameMen } = curr.men;
    const { name: nameWomen } = curr.women;
    return [...acc, nameMen, nameWomen];
  }, []);

  const dataAthletes = athletes.
  reduce((acc, curr) => {
    const index = acc.findIndex(({ athlete }) => athlete === curr);
    if (index !== -1) {
      acc[index].value += 1;
      return acc;
    }
    return [...acc, {
      athlete: curr,
      value: 1 }];

  }, []).
  sort(({ value: vA }, { value: vB }) => vA > vB ? -1 : 1);


  const width = 300;
  const height = 200;

  // create a linear scale mapping the scale of the path to a [1, 4] range
  const scale = scaleLinear().
  domain(extent(dataChampionships, ({ value }) => value)).
  range([1, 4]);


  // ordinal scale describing the different shades of blue applied to the wave
  // 1. based on the index of the shape
  // 1. increasing in blue intensity
  const colorScale = scaleOrdinal().
  domain(range(dataChampionships.length).reverse()).
  range(schemeBlues[dataChampionships.length]);

  return (
    React.createElement(Visualization, null,
    React.createElement(Main, null,
    React.createElement(Heading, null, "Riding the wave"),

    React.createElement("p", null, "Surfing championships have been held since ", React.createElement("strong", null, data[data.length - 1].year), ", showcasing talent at a global scale."),
    React.createElement("p", null, "Despite the global reach, a few countries monopolize the sport, with ", React.createElement("strong", null, dataChampionships[0].country), " alone able to win ", React.createElement("strong", null, dataChampionships[0].value), " times."),
    React.createElement("p", null, "A few athletes have also been able to win on multiple occasions:"),

    React.createElement(List, null,
    dataAthletes.slice(0, 3).map(({ athlete, value }) => React.createElement("li", { key: athlete },
    athlete, " (", value, " times)"))),


    React.createElement(Source, null, "Source: ", React.createElement("a", { href: "https://www.worldsurfleague.com/pages/history" }, "Surf World League"))),



    React.createElement(Illustration, { viewBox: `-10 ${-height - 8} ${width} ${height}` },
    React.createElement("defs", null,

    React.createElement("path", { id: "wave", d: "M 0 0 a 45 45 0 0 1 60 -40 a 20 20 0 0 0 0 40" }),

    React.createElement("filter", { id: "shadow" },
    React.createElement("feDropShadow", { dx: "0.1", dy: "0.1", stdDeviation: "0.3" }))),



    dataChampionships.map(({ country, value }, index) => React.createElement("g", { key: country },

    React.createElement("g", { transform: `scale(${scale(value)})` },

    React.createElement("use", {
      style: { filter: 'url(#shadow)' },
      href: "#wave",
      fill: colorScale(index),
      stroke: colorScale(index),
      strokeWidth: "4",
      strokeLinecap: "round",
      strokeLinejoin: "round" }),

    React.createElement("text", { dy: "-2" },
    React.createElement("textPath", {
      href: "#wave",
      startOffset: "57%",
      textAnchor: "end",
      fontSize: 6,
      fontWeight: "700",
      fill: "hsl(220, 90%, 5%)",
      stroke: "none" },
    country))))))));







}





ReactDOM.render(React.createElement(App, null), document.getElementById('root'));