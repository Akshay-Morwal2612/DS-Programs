const Content = ({ categoryId, name, description, icon, colorClass }) => {
  return (
    <article className="category-card">
      <div className="card-top">
        <div className={`category-icon ${colorClass}`}>{icon}</div>
        <div className="card-info">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>

      <div className="card-bottom">
        <a className="view-link" href={`?page=programs&category=${categoryId}`}>
          View Programs
          <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}

export default Content
