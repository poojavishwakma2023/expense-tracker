
import Cards from './Cards'
import '../stylesComponent/summeryCards.css'

function SummaryCards() {
  return (
    <div className="summary-cards">
      <Cards
        title="Monthly Budget"
        value="₹50,000"
      />

      <Cards
        title="This Month Spending"
        value="₹30,000"
      />

      <Cards
        title="Remaining Budget"
        value="₹20,000"
      />

      <Cards
        title="Total Transactions"
        value={45}
      />
    </div>
  )
}

export default SummaryCards