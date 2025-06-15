import './style.css'

class Character {
  image: string
  name: string
  house: string

  constructor(image: string, name: string, house: string) {
    this.image = image
    this.name = name
    this.house = house
  }
}


const app = document.querySelector<HTMLDivElement>('#app')!


function header() {
  const headerDiv:HTMLDivElement = document.createElement('div')
  headerDiv.className = 'header py-10 bg-blue-900 fixed top-0 right-0 left-0 z-50 flex gap-8'

  const logo:HTMLImageElement = document.createElement("img")
  logo.src = ("/src/img/logo.png")
  logo.alt = "Logo Harry Potter"
  logo.className = 'absolute w-30 ps-8 top-0.5'

  const linkAccueil:HTMLAnchorElement = document.createElement('a')
  linkAccueil.href = ''
  linkAccueil.className = 'px-8 text-2xl text-white transition-transform duration-300 transform hover:scale-120 ps-40'
  linkAccueil.textContent = 'Home'

  const linkMaison:HTMLAnchorElement = document.createElement('a')
  linkMaison.href = ''
  linkMaison.className = 'px-8 text-2xl text-white transition-transform duration-300 transform hover:scale-120'
  linkMaison.textContent = 'Houses'

  const linkFilms:HTMLAnchorElement = document.createElement('a')
  linkFilms.href = ''
  linkFilms.className = 'px-8 text-2xl text-white transition-transform duration-300 transform hover:scale-120'
  linkFilms.textContent = 'Movies'

  const linkLivres:HTMLAnchorElement = document.createElement('a')
  linkLivres.href = ''
  linkLivres.className = 'px-8 text-2xl text-white transition-transform duration-300 transform hover:scale-120'
  linkLivres.textContent = 'Books'

  const gif:HTMLImageElement = document.createElement("img")
  gif.src = ("/src/img/harry.gif")
  gif.alt = "Harry qui vole"
  gif.className = "absolute w-24 left-300 bottom-2"

  headerDiv.appendChild(logo)
  headerDiv.appendChild(linkAccueil)
  headerDiv.appendChild(linkMaison)
  headerDiv.appendChild(linkFilms)
  headerDiv.appendChild(linkLivres)
  headerDiv.appendChild(gif)
  app.appendChild(headerDiv)




//==================================================MAISON=============================================




  linkMaison.addEventListener("click", async(e:MouseEvent)=>{
    e.preventDefault()
  
    while (app.firstChild) {
      app.removeChild(app.firstChild);
    }
  
    header()
  
    const res = await fetch("https://potterhead-api.vercel.app/api/houses")
    const maisons = await res.json()
  
  
    const title:HTMLHeadingElement = document.createElement("h1")
    title.textContent = "The 4 hogwarts houses"
    title.className = "text-4xl mt-30 text-center drop-shadow-[0_0_5px_white]"
    app.appendChild(title)
  
  
    const container:HTMLDivElement = document.createElement("div")
    container.className = "grid grid-cols-2 gap-6 p-10"
  
  
    maisons.forEach((maison: any) => {
      const carte:HTMLDivElement = document.createElement("div")
      carte.className = "bg-black bg-opacity-50 text-white text-4xl p-15 rounded-lg shadow-md flex items-center justify-center hover:cursor-pointer transition-transform duration-300 transform hover:scale-105"
  
  
      const name:HTMLHeadingElement = document.createElement("h2")
      name.textContent = maison;

      carte.addEventListener("click", () => {
        displayCharactersByHouse(maison)
      })

  
      carte.appendChild(name)
      container.appendChild(carte)
    });
  
  app.appendChild(container)
    
  });




  //====================================================FILMS===================================================




  linkFilms.addEventListener("click", async(e:MouseEvent)=>{
    e.preventDefault()

    while(app.firstChild){
      app.removeChild(app.firstChild)
    }

    header()

    const res = await fetch("https://potterhead-api.vercel.app/api/movies")
    const films = await res.json()

    const title:HTMLHeadingElement = document.createElement("h1")
    title.textContent = "All movies"
    title.className = "text-4xl mt-30 text-center drop-shadow-[0_0_5px_white]"
    app.appendChild(title)

    const container:HTMLDivElement = document.createElement("div")
    container.className = "grid grid-cols-2 gap-6 p-10"

    films.forEach((films:any)=> {

      const img:HTMLImageElement = document.createElement("img")
      img.src = films.poster
      img.alt = "Image du film"
      img.className = "w-80"

      const name:HTMLHeadingElement = document.createElement("h2")
      name.textContent = films.title
      name.className = "text-white text-2xl font-bold mb-2"

      const carte:HTMLDivElement = document.createElement("div")
      carte.className = "bg-black bg-opacity-50 text-while p-15 rounded-lg shadow-md flex items-center justify-center flex-col"


      const year:HTMLParagraphElement = document.createElement("p")
      year.textContent = `release date: ${films.release_date}`
      year.className = "text-white"

      const budget:HTMLParagraphElement = document.createElement("p")
      budget.textContent = `Budget: ${films.budget}`
      budget.className = "text-white"

      carte.appendChild(img)
      carte.appendChild(name)
      carte.appendChild(year)
      carte.appendChild(budget)
      container.appendChild(carte)
    })

    app.appendChild(container)

    footer()
  })




  //==================================LIVRE===================================================




  linkLivres.addEventListener("click", async(e:MouseEvent)=>{
    e.preventDefault()

    while(app.firstChild){
      app.removeChild(app.firstChild)
    }
    
    header()

    const res = await fetch("https://potterhead-api.vercel.app/api/books")
    const livres = await res.json()

    const title:HTMLHeadElement = document.createElement("h1")
    title.textContent = "All books"
    title.className = "text-4xl mt-30 text-center drop-shadow-[0_0_5px_white]"
    app.appendChild(title)

    const container:HTMLDivElement = document.createElement("div")
    container.className = "grid grid-cols-2 gap-6 p-10"

    livres.forEach((livre:any)=>{
      const img:HTMLImageElement = document.createElement("img")
      img.src = livre.cover
      img.alt = "Couverture du livre"
      img.className = "w-80"

      const name:HTMLHeadingElement = document.createElement("h2")
      name.textContent = livre.title
      name.className = "text-white text-2xl font-bold mb-2"

      const carte:HTMLDivElement = document.createElement("div")
      carte.className = "bg-black bg-opacity-50 text-while p-15 rounded-lg shadow-md flex items-center justify-center flex-col"

      const page:HTMLParagraphElement = document.createElement("p")
      page.textContent = `Pages: ${livre.pages}`
      page.className = "text-white"

      const year:HTMLParagraphElement = document.createElement("p")
      year.textContent = `Release date: ${livre.release_date}`
      year.className = "text-white"

      carte.appendChild(img)
      carte.appendChild(name)
      carte.appendChild(page)
      carte.appendChild(year)
      container.appendChild(carte)
    })
    app.appendChild(container)

    footer()
  })
}



//============================================ACCUEIL===========================================================



const mainDiv:HTMLDivElement = document.createElement('div')
mainDiv.className = 'grid grid-cols-5 gap-6 p-10'

const h1:HTMLHeadingElement = document.createElement('h1')
h1.className = 'flex items-center justify-center text-5xl pt-10 drop-shadow-[0_0_5px_white] mt-30'
h1.textContent = "Hogwarts students"

header()
app.appendChild(h1)
app.appendChild(mainDiv)



async function callAPI(): Promise<any[]> {
  const res = await fetch("https://hp-api.onrender.com/api/characters")
  return await res.json()
}

async function displayCharacters(): Promise<void> {
  const dataPure = await callAPI()

  const chars: Character[] = dataPure.map((char: any) =>
    new Character(char.image, char.name, char.house)
  )

  chars.forEach(char => {
    const card:HTMLDivElement = document.createElement("div")
    card.className =
      "bg-black bg-opacity-50 rounded-lg p-6 m-4 max-w-xs text-white shadow-lg flex flex-col items-center justify-center border-4 border-white-500 hover:bg-sky-700 hover:cursor-pointer transition-transform duration-300 transform hover:scale-105"

    const nameElem:HTMLHeadingElement = document.createElement("h2")
    nameElem.textContent = char.name
    nameElem.className = "text-2xl font-bold mb-2"

    const img:HTMLImageElement = document.createElement("img")
    img.src = char.image
    img.alt = `Portrait de ${char.name}`
    img.className = "w-32 h-32 rounded-full object-cover mb-4"

    const houseElem:HTMLParagraphElement = document.createElement("p")
    houseElem.textContent = `House : ${char.house}`
    houseElem.className = "text-lg"

    card.appendChild(img)
    card.appendChild(nameElem)
    card.appendChild(houseElem)

    mainDiv.appendChild(card)

    card.addEventListener("click", ():void=>{
      characterDetail(char)
    })
  })
}


displayCharacters()



//=================================AFFICHAGE DÉTAIL========================================================



class DetailCharacter {
  image: string
  name: string
  house: string
  alternateName: string
  birth: string
  yearBirth: number
  espece: string
  genre: string
  ancetre: string
  hair: string
  eye: string
  isAlive: boolean
  actor: string

  constructor(image: string,name: string,house: string,alternateName: string,birth: string,yearBirth: number,espece: string,genre: string,ancetre: string,hair: string,eye: string,isAlive: boolean,actor: string) {
    this.image = image
    this.name = name
    this.house = house
    this.alternateName = alternateName
    this.birth = birth
    this.yearBirth = yearBirth
    this.espece = espece
    this.genre = genre
    this.ancetre = ancetre
    this.hair = hair
    this.eye = eye
    this.isAlive = isAlive
    this.actor = actor
  }
}



async function characterDetail(char: Character) {
  while (app.firstChild) {
    app.removeChild(app.firstChild)
  }

  header()

  const res = await fetch("https://hp-api.onrender.com/api/characters")
  const allCharacters = await res.json()

  const data = allCharacters.find((perso: any) => perso.name === char.name)

  const detail = new DetailCharacter(
    data.image,
    data.name,
    data.house,
    data.alternate_names[0] || "None",
    data.dateOfBirth || "Unknown",
    data.yearOfBirth || "Unknown",
    data.species || "Unknown",
    data.gender || "Unknown",
    data.ancestry || "Unknown",
    data.hairColour || "Unknown",
    data.eyeColour || "Unknown",
    data.alive,
    data.actor || "Unknown"
  )

  const titre = document.createElement("h1")
  titre.textContent = `Details of ${detail.name}`
  titre.className = "text-4xl mt-20 text-center mt-30 drop-shadow-[0_0_5px_white]"
  app.appendChild(titre)

  const centerDiv = document.createElement("div")
  centerDiv.className = "flex justify-center mt-10"

  const card: HTMLDivElement = document.createElement("div")
  card.className ="bg-black bg-opacity-50 rounded-lg p-6 m-4 text-white shadow-lg flex flex-col items-center justify-center border-4 border-white-500"

  centerDiv.appendChild(card)
  app.appendChild(centerDiv)
    const img = document.createElement("img")
    img.src = detail.image
    img.alt = detail.name
    img.className = "w-40 h-40 rounded-full object-cover mb-4"
    card.appendChild(img)

    const details = [
    `Name : ${detail.name}`,
    `House : ${detail.house}`,
    `Alternate name : ${detail.alternateName}`,
    `Birth year : ${detail.yearBirth}`,
    `Birthday : ${detail.birth}`,
    `Actor : ${detail.actor}`,
    `Species : ${detail.espece}`,
    `Sex : ${detail.genre}`,
    `Ancestor : ${detail.ancetre}`,
    `Hair : ${detail.hair}`,
    `Eye : ${detail.eye}`,
    `is alive : ${detail.isAlive ? "Yes" : "No"}`
    ]

    for (const detail of details) {
      const p = document.createElement("p")
      p.textContent = detail
      p.className = "mb-1 p-1 text-4xl text-white"
      card.appendChild(p)
    }

  footer()
}



//=====================================================FILTRE MAISON==========================================



async function displayCharactersByHouse(houseName:string):Promise<void>{

  while(app.firstChild){
    app.removeChild(app.firstChild)
  }

  header()

  const res = await fetch("https://hp-api.onrender.com/api/characters")
  const allCharacters = await res.json()

  const filtered = allCharacters.filter((char:any)=> char.house === houseName)

  const title = document.createElement("h1")
  title.textContent = `Wizards of ${houseName}`
  title.className = "text-4xl mt-30 text-center drop-shadow-[0_0_5px_white]"
  app.appendChild(title)

  const container = document.createElement("div")
  container.className = "grid grid-cols-4 gap-6 p-10"

  filtered.forEach((char:any)=>{
    const card = document.createElement("div")
    card.className = "bg-black bg-opacity-50 text-white p-6 rounded-lg shadow-md flex flex-col items-center hover:cursor-pointer hover:scale-105 transition-transform"

    const img = document.createElement("img")
    img.src = char.image
    img.alt = char.name
    img.className = "w-32 h-32 rounded-full mb-4 object-cover"

    const name = document.createElement("h2")
    name.textContent = char.name
    name.className = "text-2xl font-bold mb-2"

    card.appendChild(img)
    card.appendChild(name)
    container.appendChild(card)

    card.addEventListener("click", () => {
      characterDetail(new Character(char.image, char.name, char.house))
    })
  })

  app.appendChild(container)
  footer()
}



//===================================FOOTER=====================================================================



function footer():void {
  const footer = document.createElement('footer')
  footer.className = 'bg-blue-900 text-white text-center py-4'
  footer.textContent = '© Petitjean Quentyn'
  app.appendChild(footer)
}

footer()