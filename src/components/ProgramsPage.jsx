import { useEffect, useState } from 'react'
import {
  getProgramCategoryId,
  getProgramLanguage,
  programCategories,
  repositoryApiUrl,
  supportedSourceFile,
} from '../programs'

const categoriesForNavigation = [
  { id: 'all', name: 'All programs' },
  ...programCategories.map(({ id, name }) => ({ id, name })),
]

const getProgramsUrl = (categoryId) =>
  `?page=programs${categoryId ? `&category=${encodeURIComponent(categoryId)}` : ''}`

const goBackToCategories = () => {
  window.location.assign(`${window.location.pathname}#programs`)
}

const ProgramItem = ({ file, index }) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false)
  const [code, setCode] = useState(null)
  const [isLoadingCode, setIsLoadingCode] = useState(false)
  const [codeError, setCodeError] = useState('')
  const [copyStatus, setCopyStatus] = useState('')

  const loadCode = async () => {
    setIsCodeVisible(true)
    if (code !== null || isLoadingCode) return

    setIsLoadingCode(true)
    setCodeError('')
    try {
      const response = await fetch(file.downloadUrl)
      if (!response.ok) {
        throw new Error(`GitHub returned HTTP ${response.status}.`)
      }
      setCode(await response.text())
    } catch (error) {
      console.error(`Failed to load ${file.path}:`, error)
      setCodeError('Could not load this file from GitHub. Check your connection and try again.')
    } finally {
      setIsLoadingCode(false)
    }
  }

  const toggleCode = () => {
    if (isCodeVisible && !codeError) {
      setIsCodeVisible(false)
      return
    }
    loadCode()
  }

  const copyCode = async () => {
    if (!navigator.clipboard?.writeText) {
      setCopyStatus('Clipboard access is unavailable in this browser.')
      return
    }

    try {
      await navigator.clipboard.writeText(code)
      setCopyStatus('Copied!')
    } catch (error) {
      console.error(`Failed to copy ${file.path}:`, error)
      setCopyStatus('Copy unavailable; select the code to copy it.')
    }
  }

  return (
    <article className="program-item">
      <span className="program-number">{String(index + 1).padStart(2, '0')}</span>
      <div className="program-details">
        <h3>{file.name}</h3>
        <p>Source file in the {file.category} category.</p>
        <button
          className="view-code-button"
          type="button"
          onClick={toggleCode}
          aria-expanded={isCodeVisible}
          disabled={isLoadingCode}
        >
          {isLoadingCode
            ? 'Loading code...'
            : codeError
              ? 'Retry loading code'
              : isCodeVisible
                ? 'Hide code'
                : 'View code'}
        </button>
        <a
          className="repository-source-link"
          href={file.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in GitHub
        </a>
      </div>
      <span className="program-tag">{file.category}</span>
      {isCodeVisible && (
        <div className="program-code-panel">
          <div className="program-code-header">
            <span>{getProgramLanguage(file.name)}</span>
            <span className="copy-code-status" role="status" aria-live="polite">
              {copyStatus}
            </span>
            <button
              className="copy-code-button"
              type="button"
              onClick={copyCode}
              disabled={code === null}
            >
              Copy code
            </button>
          </div>
          <pre><code>{isLoadingCode ? 'Loading source code...' : codeError || code}</code></pre>
        </div>
      )}
    </article>
  )
}

const ProgramsPage = ({ selectedCategoryId }) => {
  const [programs, setPrograms] = useState([])
  const [search, setSearch] = useState('')
  const [loadError, setLoadError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const selectedCategory = programCategories.find(({ id }) => id === selectedCategoryId)

  useEffect(() => {
    const controller = new AbortController()

    const loadPrograms = async () => {
      setIsLoading(true)
      setLoadError('')

      try {
        const response = await fetch(repositoryApiUrl, {
          headers: { Accept: 'application/vnd.github+json' },
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`GitHub returned HTTP ${response.status}.`)
        }

        const files = await response.json()
        if (!Array.isArray(files)) {
          throw new Error('The GitHub DS folder response is not a file list.')
        }

        const repositoryPrograms = files
          .filter((file) =>
            file.type === 'file' &&
            supportedSourceFile.test(file.name) &&
            getProgramCategoryId(file.name) &&
            typeof file.download_url === 'string' &&
            typeof file.html_url === 'string'
          )
          .map((file) => {
            const categoryId = getProgramCategoryId(file.name)
            const category = programCategories.find(({ id }) => id === categoryId)
            return {
              name: file.name,
              path: file.path,
              downloadUrl: file.download_url,
              htmlUrl: file.html_url,
              categoryId,
              category: category.name,
            }
          })
          .sort((first, second) => first.name.localeCompare(second.name))

        setPrograms(repositoryPrograms)
      } catch (error) {
        if (error.name === 'AbortError') return
        console.error('Failed to load the DS folder from GitHub:', error)
        setLoadError(
          'Could not load programs from GitHub. Check that the repository is public and that you have an internet connection.'
        )
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    loadPrograms()
    return () => controller.abort()
  }, [])

  const visiblePrograms = programs
    .filter((file) => !selectedCategory || file.categoryId === selectedCategory.id)
    .filter((file) => `${file.name} ${file.category}`.toLowerCase().includes(search.trim().toLowerCase()))

  const title = selectedCategory ? `${selectedCategory.name} Programs` : 'All Programs'
  const description = selectedCategory
    ? selectedCategory.description
    : 'Browse data structure and algorithm programs from the public repository.'

  return (
    <>
      <nav className="navbar programs-page">
        <a className="logo" href={`${window.location.pathname}#home`} aria-label="DS Programs home">
          <span className="logo-icon">&lt;/&gt;</span>
          <span>DS</span>
          <span className="logo-text">Programs</span>
        </a>
        <button className="back-home" type="button" onClick={goBackToCategories}>
          ← Back to categories
        </button>
      </nav>

      <main className="programs-main">
        <div className="programs-heading">
          <p className="programs-eyebrow">DS PROGRAM LIBRARY</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <label className="search-box programs-search">
          <span className="search-icon" aria-hidden="true" />
          <input
            className="search-input"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search programs..."
            aria-label="Search programs"
          />
        </label>

        <nav className="program-category-nav" aria-label="Program categories">
          {categoriesForNavigation.map((category) => (
            <a
              key={category.id}
              className={`program-category-link${(selectedCategoryId || 'all') === category.id ? ' active' : ''}`}
              href={getProgramsUrl(category.id === 'all' ? null : category.id)}
              aria-current={(selectedCategoryId || 'all') === category.id ? 'page' : undefined}
            >
              {category.name}
            </a>
          ))}
        </nav>

        <div className="programs-results">
          <h2 className="section-title">Available programs</h2>
          {!isLoading && !loadError && (
            <p className="program-results-count" aria-live="polite">
              {visiblePrograms.length} {visiblePrograms.length === 1 ? 'program' : 'programs'}
            </p>
          )}
        </div>

        {isLoading && (
          <p className="programs-load-status" role="status" aria-live="polite">
            Loading programs from GitHub...
          </p>
        )}
        {loadError && <p className="programs-load-status" role="alert">{loadError}</p>}

        {!isLoading && !loadError && visiblePrograms.length > 0 && (
          <section className="program-list" aria-label="Programs">
            {visiblePrograms.map((file, index) => (
              <ProgramItem key={file.path} file={file} index={index} />
            ))}
          </section>
        )}

        {!isLoading && !loadError && visiblePrograms.length === 0 && (
          <p className="empty-programs">
            {programs.length === 0
              ? "No source files were found in the repository's DS folder."
              : 'No programs match this category or search.'}
          </p>
        )}
      </main>
    </>
  )
}

export default ProgramsPage
