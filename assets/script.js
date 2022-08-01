const contributionsDisplay = document.getElementById('contributions-number')
const displayClass = document.getElementById('contributions-number').classList
let displayNumber = 0

// show up there are too many cards
const showInfoInConsole = () => {
  const cardsInIndex = document.getElementsByClassName('card').length - 1

  console.info('Cards in index.html', cardsInIndex)
  if (cardsInIndex > 100) console.warn('Too many cards in index.html. Move older cards to archive.', cardsInIndex)
}
showInfoInConsole()

// display for the number of contributions
const countUp = () => {
  const numberOfCards = document.getElementsByClassName('card').length
  const numberOfContributors = numberOfCards - 1 // minus the example card

  setTimeout(() => {
    if (displayNumber < numberOfContributors) {
      displayNumber++
      contributionsDisplay.textContent = displayNumber
      countUp()
    }

    if (displayNumber === numberOfContributors) displayClass.add('rubberBand')
  }, 15)
}

// adding the archive cards to the grid
const createArchiveObject = i => {
  const container = document.querySelector('.container')
  const archiveObject = document.createElement('object')
  archiveObject.setAttribute('id', `archiveObject_${i}`)
  archiveObject.setAttribute('data', `archive/archive_${i}.html`)
  archiveObject.setAttribute('type', 'text/html')
  archiveObject.setAttribute('width', '300')
  archiveObject.setAttribute('height', '5000')
  container.append(archiveObject)
}
const NUMBER_OF_FILES = 9
let current = 1
const getArchiveCards = i => {
  createArchiveObject(i)

  document.getElementById(`archiveObject_${i}`).onload = function() {
    const archiveObject = document.getElementById(`archiveObject_${i}`)
    const cards = archiveObject.contentDocument.querySelectorAll('.card')
    const grid = document.querySelector('.grid')

    cards.forEach(card => grid.append(card))
    archiveObject.remove()

    if (current < NUMBER_OF_FILES) {
      current++
      getArchiveCards(current)
    }
    countUp()
  }
}

getArchiveCards(current)

// night mode feature
$('#toggle-box-checkbox').on('change', function() {
  if (this.checked) {
    $('body').addClass('night')
  } else {
    $('body').removeClass('night')
  }
})

function demo() {
  setInterval(function() {
    $('#toggle-box-checkbox').trigger('click')
  }, 1000)
}
if (document.location.pathname.indexOf('fullcpgrid') > -1) {
  demo()
}

// Current year for footer
const currentYearSpan = document.getElementById('currentYear')
const currentYear = new Date().getFullYear()
currentYearSpan.innerText = currentYear

// Search bar 
const searchBar = document.getElementById('searchbar');
searchBar.addEventListener('input', searchCard);

function searchCard() {
  let input = searchBar.value.toLowerCase();
  const cards = document.getElementsByClassName('card');
    
  for (i = 0; i < cards.length; i++) { 
      if (!cards[i].textContent.toLowerCase().includes(input)) {
          cards[i].style.display="none";
      }
      else {
          cards[i].style.display="flex";                 
      }
  }
}