import Navbar from './components/navbar'
import Hero from './components/hero'
import Content from './components/content'
import Footer from './components/footer'
import ProgramsPage from './components/ProgramsPage'
import { programCategories } from './programs'

const App = () => {
  const searchParams = new URLSearchParams(window.location.search)
  if (searchParams.get('page') === 'programs') {
    return (
      <>
        <ProgramsPage selectedCategoryId={searchParams.get('category')} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <div className="categories" id='programs'>
          {programCategories.map((elem) => (
            <Content
              key={elem.id}
              categoryId={elem.id}
              name={elem.name}
              description={elem.cardDescription}
              icon={elem.icon}
              colorClass={elem.colorClass}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
