import uniqid from 'uniqid'

const books = [
  {
    id: uniqid(),
    title: 'Приключения Шерлока Холмса',
    description:
      'Классическая серия детективных рассказов о Шерлоке Холмсе, написанная сэром Артуром Конаном Дойлем.',
    author: 'Артур Конан Дойл',
    favorite: 'true',
    fileCover: 'sherlock_holmes_cover.jpg',
    fileName: 'sherlock_holmes_stories.pdf'
  },
  {
    id: uniqid(),
    title: 'Властелин колец',
    description:
      'Эпическая фантастическая трилогия, повествующая о борьбе против зла в вымышленном мире Средиземья.',
    author: 'Дж. Р. Р. Толкиен',
    favorite: 'false',
    fileCover: 'lord_of_the_rings_cover.jpg',
    fileName: 'lord_of_the_rings_trilogy.pdf'
  }
]

export default books
