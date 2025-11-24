export interface FlashcardQuestion {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface OpenEndedQuestion {
  question: string;
  sampleAnswer: string;
  keyPoints: string[];
}

export interface ModuleQuestions {
  flashcards: FlashcardQuestion[];
  quiz: QuizQuestion[];
  openEnded: OpenEndedQuestion[];
}

export const questionBank: Record<string, ModuleQuestions> = {
  accounting: {
    flashcards: [
      {
        question: "What are the three main financial statements?",
        answer: "Income Statement, Balance Sheet, and Cash Flow Statement",
      },
      {
        question: "What does GAAP stand for?",
        answer: "Generally Accepted Accounting Principles",
      },
      {
        question: "What is the accounting equation?",
        answer: "Assets = Liabilities + Shareholders' Equity",
      },
      {
        question: "What is depreciation?",
        answer: "The systematic allocation of the cost of a tangible asset over its useful life",
      },
      {
        question: "What is EBITDA?",
        answer: "Earnings Before Interest, Taxes, Depreciation, and Amortization",
      },
      {
        question: "What is working capital?",
        answer: "Current Assets minus Current Liabilities",
      },
      {
        question: "What is accounts receivable?",
        answer: "Money owed to a company by its customers for goods or services delivered",
      },
      {
        question: "What is the difference between CAPEX and OPEX?",
        answer: "CAPEX is capital expenditure for long-term assets; OPEX is operating expenses for day-to-day operations",
      },
      {
        question: "What is goodwill?",
        answer: "An intangible asset that arises when a company acquires another for more than the fair value of its net assets",
      },
      {
        question: "What is accrual accounting?",
        answer: "An accounting method where revenue and expenses are recorded when they are earned or incurred, not when cash changes hands",
      },
      {
        question: "What is net income?",
        answer: "Total revenue minus total expenses, also known as the bottom line",
      },
      {
        question: "What is retained earnings?",
        answer: "The cumulative net income that has been retained by the company rather than distributed as dividends",
      },
    ],
    quiz: [
      {
        question: "If a company has $100M in assets and $60M in liabilities, what is the shareholders' equity?",
        options: ["$160M", "$40M", "$60M", "$100M"],
        correctAnswer: 1,
        explanation: "Using the accounting equation: Assets ($100M) = Liabilities ($60M) + Equity. Therefore, Equity = $100M - $60M = $40M",
      },
      {
        question: "Which financial statement shows a company's financial position at a specific point in time?",
        options: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "Statement of Retained Earnings"],
        correctAnswer: 1,
        explanation: "The Balance Sheet is a snapshot showing assets, liabilities, and equity at a specific date",
      },
      {
        question: "A company purchases equipment for $50,000 cash. How does this affect the balance sheet?",
        options: [
          "Assets increase by $50,000",
          "Assets stay the same (cash decreases, equipment increases)",
          "Assets decrease by $50,000",
          "Liabilities increase by $50,000",
        ],
        correctAnswer: 1,
        explanation: "Cash (an asset) decreases by $50,000 while Equipment (an asset) increases by $50,000, so total assets remain unchanged",
      },
      {
        question: "What is the main difference between cash and accrual accounting?",
        options: [
          "Cash accounting is only for large companies",
          "Accrual accounting records transactions when cash changes hands",
          "Cash accounting records transactions when cash changes hands",
          "There is no difference",
        ],
        correctAnswer: 2,
        explanation: "Cash accounting records transactions when cash is received or paid, while accrual accounting records when earned or incurred",
      },
      {
        question: "Which of the following is NOT a current asset?",
        options: ["Cash", "Accounts Receivable", "Inventory", "Property, Plant & Equipment"],
        correctAnswer: 3,
        explanation: "PP&E is a long-term asset. Current assets are expected to be converted to cash within one year",
      },
      {
        question: "What happens to net income if depreciation expense increases?",
        options: [
          "Net income increases",
          "Net income decreases",
          "Net income stays the same",
          "It depends on revenue",
        ],
        correctAnswer: 1,
        explanation: "Depreciation is an expense, so an increase in depreciation expense decreases net income",
      },
      {
        question: "Where does depreciation appear on the Cash Flow Statement?",
        options: [
          "It doesn't appear",
          "Cash from Financing",
          "Cash from Investing",
          "Cash from Operations (added back)",
        ],
        correctAnswer: 3,
        explanation: "Depreciation is a non-cash expense, so it's added back to net income in the operating activities section",
      },
    ],
    openEnded: [
      {
        question: "Walk me through the three financial statements and how they're connected.",
        sampleAnswer: "The three statements are interconnected. Starting with the Income Statement, which shows revenue minus expenses to get Net Income. Net Income flows to the Cash Flow Statement (as the starting point for operating activities) and to the Balance Sheet (increasing Retained Earnings in equity). The Cash Flow Statement shows changes in cash through operating, investing, and financing activities. The ending cash balance links to the Cash line on the Balance Sheet. Changes in Balance Sheet items (like A/R, inventory, A/P) flow to the Cash Flow Statement as adjustments to cash from operations.",
        keyPoints: [
          "Net income flows from Income Statement to Cash Flow Statement and Balance Sheet",
          "Cash from Cash Flow Statement links to Balance Sheet",
          "Changes in Balance Sheet items affect Cash Flow Statement",
          "All three statements are for the same period",
        ],
      },
      {
        question: "If depreciation increases by $10, walk me through the impact on the three statements.",
        sampleAnswer: "On the Income Statement, the $10 increase in depreciation (an expense) decreases Net Income by $10 (assuming no tax for simplicity, or $7 after-tax at 30%). On the Cash Flow Statement, Net Income is down $10, but depreciation is a non-cash expense so we add back the $10, resulting in no net change to cash. On the Balance Sheet, cash is unchanged, but PP&E is down $10 (more depreciation), and Retained Earnings is down $10 (from lower net income). Both sides still balance.",
        keyPoints: [
          "Income Statement: Net Income decreases by depreciation amount",
          "Cash Flow Statement: Depreciation added back (non-cash expense)",
          "Balance Sheet: PP&E decreases, Retained Earnings decreases",
          "Net cash impact is zero",
        ],
      },
      {
        question: "What is the difference between revenue and cash from operations?",
        sampleAnswer: "Revenue is recorded when earned (accrual basis), not necessarily when cash is collected. Cash from operations adjusts net income (which includes revenue) for non-cash items and changes in working capital. For example, if a company records $100 in revenue but hasn't collected the cash yet, revenue increases by $100 but cash doesn't change—instead, Accounts Receivable increases. The Cash Flow Statement would show an adjustment reducing cash from operations by the A/R increase.",
        keyPoints: [
          "Revenue follows accrual accounting (when earned)",
          "Cash from operations is actual cash generated",
          "Working capital changes affect cash but not revenue",
          "Non-cash items like depreciation create differences",
        ],
      },
      {
        question: "Why might a profitable company have negative cash flow?",
        sampleAnswer: "A company can be profitable (positive net income) but have negative cash flow for several reasons: 1) Large capital expenditures in PP&E (investing activities), 2) Increasing working capital (e.g., building inventory, extending credit to customers increases A/R), 3) Debt repayments or dividend payments (financing activities), 4) Non-cash revenue recognition without cash collection. The company might be growing rapidly and investing heavily for future growth.",
        keyPoints: [
          "Heavy investment in capital expenditures",
          "Working capital increases tie up cash",
          "Debt repayments reduce cash",
          "Revenue recognized but cash not yet collected",
        ],
      },
      {
        question: "How would a $100 inventory purchase on credit affect the three statements?",
        sampleAnswer: "On the Income Statement, there's initially no impact—inventory is a balance sheet item, not an expense. It only hits the income statement as COGS when sold. On the Balance Sheet, Inventory (asset) increases by $100, and Accounts Payable (liability) increases by $100—both sides balance. On the Cash Flow Statement, there's no immediate cash impact since it was purchased on credit. When the payable is later paid, cash would decrease.",
        keyPoints: [
          "Income Statement: No immediate impact",
          "Balance Sheet: Inventory up $100, A/P up $100",
          "Cash Flow Statement: No immediate impact (purchased on credit)",
          "Inventory becomes expense when sold as COGS",
        ],
      },
      {
        question: "Explain the difference between GAAP and IFRS.",
        sampleAnswer: "GAAP (Generally Accepted Accounting Principles) is used primarily in the United States, while IFRS (International Financial Reporting Standards) is used in most other countries. Key differences include: 1) GAAP is more rules-based while IFRS is more principles-based, 2) Inventory valuation methods differ (GAAP allows LIFO, IFRS doesn't), 3) Development costs treatment varies, 4) Revenue recognition has some differences. Companies operating internationally may need to report under both standards.",
        keyPoints: [
          "GAAP used in US, IFRS used internationally",
          "GAAP is rules-based, IFRS is principles-based",
          "Different treatments for inventory, R&D, revenue recognition",
          "Convergence efforts ongoing but differences remain",
        ],
      },
    ],
  },
  valuation: {
    flashcards: [
      {
        question: "What are the main valuation methodologies?",
        answer: "Comparable Companies Analysis (Comps), Precedent Transactions, and Discounted Cash Flow (DCF)",
      },
      {
        question: "What is a trading multiple?",
        answer: "A ratio that compares a company's market value to a financial metric (e.g., EV/EBITDA, P/E ratio)",
      },
      {
        question: "What does EV/EBITDA tell you?",
        answer: "How many times EBITDA you're paying for a company, independent of capital structure",
      },
      {
        question: "What is the P/E ratio?",
        answer: "Price per share divided by earnings per share; measures how much investors pay per dollar of earnings",
      },
      {
        question: "What is the difference between trading comps and transaction comps?",
        answer: "Trading comps use current public market valuations; transaction comps use M&A deal multiples (usually include control premium)",
      },
      {
        question: "What is a control premium?",
        answer: "The additional amount paid above market value to acquire a controlling stake in a company",
      },
      {
        question: "What is the difference between EV/Revenue and EV/EBITDA?",
        answer: "EV/Revenue ignores profitability; EV/EBITDA accounts for operational profitability",
      },
      {
        question: "Why use EV-based multiples versus equity multiples?",
        answer: "EV-based multiples are capital structure neutral and better for comparing companies with different debt levels",
      },
      {
        question: "What is comparable company analysis?",
        answer: "Valuation method using trading multiples of similar public companies to estimate a target's value",
      },
      {
        question: "When would you use P/E vs EV/EBITDA?",
        answer: "P/E for companies with similar capital structures; EV/EBITDA for comparing across different capital structures",
      },
      {
        question: "What makes a good comparable company?",
        answer: "Similar industry, size, growth profile, geography, and business model",
      },
      {
        question: "What is a valuation range?",
        answer: "A range of values derived from different methodologies or comparable companies, typically showing min, max, and median",
      },
    ],
    quiz: [
      {
        question: "Which valuation multiple is capital structure neutral?",
        options: ["P/E Ratio", "EV/EBITDA", "Price/Book", "Dividend Yield"],
        correctAnswer: 1,
        explanation: "EV/EBITDA is capital structure neutral because EV includes both debt and equity, while EBITDA is before interest (debt impact)",
      },
      {
        question: "If comparable companies trade at 10x EV/EBITDA and your target has $50M EBITDA, what is the implied EV?",
        options: ["$50M", "$500M", "$5M", "$100M"],
        correctAnswer: 1,
        explanation: "Implied EV = Multiple × EBITDA = 10 × $50M = $500M",
      },
      {
        question: "Transaction comps typically show _____ valuations than trading comps.",
        options: ["Lower", "Higher", "The same", "More volatile"],
        correctAnswer: 1,
        explanation: "Transaction comps typically include a control premium, making them higher than trading comps",
      },
      {
        question: "A company has a market cap of $100M and net debt of $20M. What is its Enterprise Value?",
        options: ["$80M", "$120M", "$100M", "$20M"],
        correctAnswer: 1,
        explanation: "Enterprise Value = Market Cap + Net Debt = $100M + $20M = $120M",
      },
      {
        question: "Which of the following is NOT typically a factor when selecting comparable companies?",
        options: ["Industry", "Size", "CEO age", "Geography"],
        correctAnswer: 2,
        explanation: "CEO age is not a relevant factor for comparability; industry, size, and geography are key selection criteria",
      },
      {
        question: "What does a P/E ratio of 20x mean?",
        options: [
          "The company earns $20 per share",
          "Investors pay $20 for every $1 of earnings",
          "The company's price is $20",
          "Earnings are 20% of price",
        ],
        correctAnswer: 1,
        explanation: "P/E of 20x means investors pay $20 for every $1 of annual earnings",
      },
      {
        question: "Why might you exclude certain outliers when using comparable companies?",
        options: [
          "To manipulate the valuation",
          "They may not be truly comparable or may skew results",
          "It's required by regulation",
          "To reduce the number of companies",
        ],
        correctAnswer: 1,
        explanation: "Outliers that aren't truly comparable or have unusual circumstances should be excluded to get a more accurate valuation range",
      },
    ],
    openEnded: [
      {
        question: "Walk me through how you would perform a comparable companies analysis.",
        sampleAnswer: "First, I'd identify a set of comparable public companies based on industry, size, geography, and business model. Then, I'd gather their financial data and calculate relevant trading multiples (EV/EBITDA, EV/Revenue, P/E, etc.). Next, I'd analyze the range of multiples, potentially excluding outliers, and determine an appropriate range (25th-75th percentile or mean/median). Finally, I'd apply these multiples to the target company's corresponding metrics to derive an implied valuation range.",
        keyPoints: [
          "Identify comparable public companies with similar characteristics",
          "Calculate relevant trading multiples for each comparable",
          "Determine appropriate multiple range (exclude outliers)",
          "Apply multiples to target's metrics to get valuation",
        ],
      },
      {
        question: "What are the advantages and disadvantages of using comparable company analysis?",
        sampleAnswer: "Advantages: Market-based and objective, easy to understand and calculate, reflects current market sentiment, widely accepted by investors. Disadvantages: Assumes market is pricing companies correctly, finding truly comparable companies can be difficult, doesn't account for company-specific factors, market multiples can be volatile and affected by broader market conditions, and may not capture long-term value.",
        keyPoints: [
          "Advantages: Market-based, simple, current market sentiment",
          "Disadvantages: Assumes efficient market, comparability issues",
          "Doesn't capture company-specific opportunities or risks",
          "Subject to market volatility",
        ],
      },
      {
        question: "How would you select appropriate comparable companies for a technology company?",
        sampleAnswer: "I'd focus on several factors: 1) Business model (SaaS, hardware, marketplace, etc.), 2) End market and customer type (B2B vs B2C), 3) Size (revenue and market cap), 4) Growth rate and profitability profile, 5) Geography/market presence, 6) Technology focus or product category. I'd cast a wide net initially, then narrow down based on closest matches. If few direct comparables exist, I might use a broader set and adjust for differences, or weight more comparable companies more heavily.",
        keyPoints: [
          "Prioritize business model and end market similarity",
          "Consider size, growth rate, and profitability",
          "Geography and product category matter",
          "Cast wide net initially, then narrow to best matches",
        ],
      },
      {
        question: "Why might precedent transactions show higher valuations than trading comps?",
        sampleAnswer: "Precedent transactions typically include a control premium—buyers pay extra to acquire control of a company. This premium compensates for the ability to control strategy, operations, and cash flows. Additionally, transaction values might reflect synergies that strategic buyers expect to realize. Market comps reflect minority stake values without control rights. The control premium typically ranges from 20-40% but varies by industry and market conditions.",
        keyPoints: [
          "Control premium for acquiring control rights",
          "Reflects synergies expected by acquirer",
          "Market comps are minority stakes without control",
          "Premium typically 20-40% depending on circumstances",
        ],
      },
      {
        question: "How do you decide which valuation multiples to use for a particular company?",
        sampleAnswer: "The choice depends on the industry and company stage. For mature, profitable companies, EV/EBITDA is standard. For high-growth tech companies that aren't profitable, EV/Revenue might be more appropriate. For financial institutions, P/E and Price/Book are common. For retail, EV/EBITDA and EV/Sales work well. I'd also consider which metrics are most relevant to investors in that sector and which best capture the value drivers. Using multiple multiples provides a more complete picture.",
        keyPoints: [
          "Industry norms matter (financials use P/E, P/B)",
          "Company stage (growth companies may use revenue multiples)",
          "Profitability level (unprofitable companies need non-earnings multiples)",
          "Use multiple metrics for comprehensive view",
        ],
      },
    ],
  },
  "ev-vs-equity": {
    flashcards: [
      {
        question: "What is Enterprise Value?",
        answer: "The total value of a company's operations, including both debt and equity holders' claims",
      },
      {
        question: "What is Equity Value?",
        answer: "The value attributable to equity shareholders only",
      },
      {
        question: "What is the bridge formula from Equity Value to Enterprise Value?",
        answer: "EV = Equity Value + Debt + Preferred Stock + Minority Interest - Cash",
      },
      {
        question: "Why do we add debt when going from equity value to enterprise value?",
        answer: "Because enterprise value represents all stakeholders; debt holders have a claim on the company's assets",
      },
      {
        question: "Why do we subtract cash when going from equity value to enterprise value?",
        answer: "Cash is considered a non-operating asset; an acquirer could use the target's cash to pay down acquisition debt",
      },
      {
        question: "What is net debt?",
        answer: "Total Debt minus Cash and Cash Equivalents",
      },
      {
        question: "Should you use EBIT or net income with EV multiples?",
        answer: "EBIT or EBITDA, because they're before interest and available to all stakeholders (debt and equity)",
      },
      {
        question: "Should you use EBIT or net income with equity multiples?",
        answer: "Net income, because it's after interest and belongs only to equity holders",
      },
      {
        question: "Why do we add minority interest in the EV bridge?",
        answer: "When you acquire a company, you acquire its consolidated subsidiaries, including minority stakes others own",
      },
      {
        question: "What is the market cap formula?",
        answer: "Share Price × Fully Diluted Shares Outstanding",
      },
      {
        question: "Is EBITDA an equity metric or enterprise value metric?",
        answer: "Enterprise value metric—it's before interest, so available to both debt and equity",
      },
      {
        question: "Is net income an equity metric or enterprise value metric?",
        answer: "Equity metric—it's after interest, so belongs only to equity holders",
      },
    ],
    quiz: [
      {
        question: "A company has equity value of $500M, debt of $100M, and cash of $50M. What is its Enterprise Value?",
        options: ["$450M", "$550M", "$650M", "$500M"],
        correctAnswer: 1,
        explanation: "EV = Equity Value + Debt - Cash = $500M + $100M - $50M = $550M",
      },
      {
        question: "Which of the following should be used with Enterprise Value multiples?",
        options: ["Net Income", "EBITDA", "EPS", "Dividends"],
        correctAnswer: 1,
        explanation: "EBITDA is before interest and taxes, available to all capital providers, so it matches with Enterprise Value",
      },
      {
        question: "Why is cash subtracted in the Enterprise Value calculation?",
        options: [
          "Because cash is not valuable",
          "It's a non-operating asset that reduces the net acquisition cost",
          "To make EV smaller than equity value",
          "It's required by accounting rules",
        ],
        correctAnswer: 1,
        explanation: "Cash is subtracted because it's excess, non-operating, and can be used to offset the acquisition cost",
      },
      {
        question: "A company has a market cap of $1B and net debt of $200M. What is its EV?",
        options: ["$800M", "$1.2B", "$1B", "$200M"],
        correctAnswer: 1,
        explanation: "EV = Market Cap + Net Debt = $1B + $200M = $1.2B",
      },
      {
        question: "Which multiple would you use to compare companies with very different capital structures?",
        options: ["P/E Ratio", "EV/EBITDA", "Price/Book", "Dividend Yield"],
        correctAnswer: 1,
        explanation: "EV/EBITDA is capital structure neutral, making it ideal for comparing companies with different debt levels",
      },
      {
        question: "If a company issues $100M in new debt and uses it to pay a dividend, what happens to EV?",
        options: [
          "EV increases by $100M",
          "EV stays the same",
          "EV decreases by $100M",
          "EV doubles",
        ],
        correctAnswer: 1,
        explanation: "Debt increases by $100M and equity value decreases by $100M (dividend reduces equity value), so EV remains unchanged",
      },
      {
        question: "What does 'fully diluted' mean in the context of shares outstanding?",
        options: [
          "Only common shares",
          "Common shares plus the impact of all in-the-money options and convertibles",
          "Preferred shares only",
          "Future authorized shares",
        ],
        correctAnswer: 1,
        explanation: "Fully diluted includes common shares plus options, warrants, and convertibles that are in-the-money",
      },
    ],
    openEnded: [
      {
        question: "Walk me through the bridge from Equity Value to Enterprise Value.",
        sampleAnswer: "Starting with Equity Value (market cap = share price times shares outstanding), we add debt because debt holders have a claim on the company. We add preferred stock and minority interest as they also represent claims on the business. We subtract cash and cash equivalents because it's a non-operating asset—an acquirer could use it to pay down debt, effectively reducing the net cost of acquisition. The formula is: EV = Equity Value + Debt + Preferred Stock + Minority Interest - Cash. This gives us the value of the company's operations attributable to all stakeholders.",
        keyPoints: [
          "Start with Equity Value (market cap)",
          "Add debt, preferred stock, minority interest (other claims)",
          "Subtract cash (non-operating, reduces net cost)",
          "EV represents value to all stakeholders",
        ],
      },
      {
        question: "Why is Enterprise Value considered capital structure neutral?",
        sampleAnswer: "Enterprise Value is capital structure neutral because it represents the total value of a company's operations regardless of how it's financed. It includes both equity and debt claims. When comparing companies, EV removes the effects of different leverage levels. For example, two identical companies with different debt levels will have different equity values but the same enterprise value. This makes EV multiples like EV/EBITDA better for comparison than equity multiples like P/E when companies have different capital structures.",
        keyPoints: [
          "Includes both debt and equity claims",
          "Independent of financing decisions",
          "Same operations = same EV regardless of debt levels",
          "Better for cross-company comparison",
        ],
      },
      {
        question: "If a company issues $50M in debt to buy back $50M in stock, what happens to Equity Value and Enterprise Value?",
        sampleAnswer: "Equity Value would decrease by $50M because there are fewer shares outstanding. Enterprise Value would stay the same because we're adding $50M in debt but reducing equity value by $50M—these offset each other in the EV calculation. This demonstrates that EV is capital structure neutral—changing how the company is financed (more debt, less equity) doesn't change the total enterprise value of the business operations.",
        keyPoints: [
          "Equity Value decreases by $50M (fewer shares)",
          "Debt increases by $50M",
          "EV stays the same (changes offset)",
          "Demonstrates capital structure neutrality",
        ],
      },
      {
        question: "Why do we add minority interest when calculating Enterprise Value?",
        sampleAnswer: "When you acquire a company, you're acquiring it on a consolidated basis, which includes its subsidiaries—even the portions owned by minority shareholders. Even though you're not buying 100% of the subsidiary, you're responsible for the entire subsidiary and need to account for that value. The minority interest represents the value of the portions of subsidiaries you don't own, but which you control. Therefore, it's added to Enterprise Value to reflect the full value of all controlled operations.",
        keyPoints: [
          "Acquisition includes consolidated subsidiaries",
          "Minority interest represents portions of subs you don't own",
          "You control the full subsidiary even if you don't own 100%",
          "Added to EV to reflect full value of controlled operations",
        ],
      },
      {
        question: "When would you use Enterprise Value multiples versus Equity Value multiples?",
        sampleAnswer: "Use Enterprise Value multiples (like EV/EBITDA, EV/Revenue) when comparing companies with different capital structures or when the metric is a pre-interest figure available to all stakeholders. Use Equity Value multiples (like P/E, P/B) when the metric is post-interest and specific to equity holders, or when comparing companies in the same industry with similar leverage. EV multiples are generally more appropriate for M&A analysis and cross-industry comparisons, while equity multiples are common for public market investing and within-industry comparisons of similarly levered companies.",
        keyPoints: [
          "EV multiples for different capital structures, pre-interest metrics",
          "Equity multiples for post-interest metrics, similar leverage",
          "EV better for M&A and cross-industry comparison",
          "Equity multiples common for public market investing",
        ],
      },
    ],
  },
  dcf: {
    flashcards: [
      {
        question: "What is a DCF?",
        answer: "Discounted Cash Flow—a valuation method that projects future cash flows and discounts them to present value",
      },
      {
        question: "What is WACC?",
        answer: "Weighted Average Cost of Capital—the blended cost of equity and debt used as the discount rate in a DCF",
      },
      {
        question: "What is terminal value?",
        answer: "The value of a company beyond the explicit forecast period, typically using perpetuity growth or exit multiple method",
      },
      {
        question: "What are the two methods to calculate terminal value?",
        answer: "Perpetuity Growth Method and Exit Multiple Method",
      },
      {
        question: "What is the perpetuity growth formula?",
        answer: "Terminal Value = Final Year FCF × (1 + g) / (WACC - g)",
      },
      {
        question: "What is free cash flow?",
        answer: "Cash flow available to all investors (debt and equity) after operating expenses and capital expenditures",
      },
      {
        question: "What is the formula for unlevered free cash flow?",
        answer: "EBIT × (1 - Tax Rate) + D&A - CapEx - Change in NWC",
      },
      {
        question: "What discount rate do you use for unlevered free cash flow?",
        answer: "WACC (Weighted Average Cost of Capital)",
      },
      {
        question: "What is the typical perpetuity growth rate range?",
        answer: "2-3%, roughly in line with long-term GDP growth",
      },
      {
        question: "Why do we tax-effect EBIT in the FCF calculation?",
        answer: "To get NOPAT (Net Operating Profit After Tax), representing after-tax operating cash flow",
      },
      {
        question: "What is the difference between levered and unlevered FCF?",
        answer: "Levered FCF is after interest payments (for equity holders); unlevered FCF is before interest (for all investors)",
      },
      {
        question: "Why is terminal value usually a large portion of total value?",
        answer: "It represents cash flows in perpetuity, which for a going concern is many years of value beyond the forecast period",
      },
    ],
    quiz: [
      {
        question: "If WACC is 10%, perpetuity growth is 3%, and final year FCF is $100M, what is the terminal value?",
        options: ["$1,000M", "$1,471M", "$700M", "$3,333M"],
        correctAnswer: 1,
        explanation: "TV = FCF × (1 + g) / (WACC - g) = $100M × 1.03 / (0.10 - 0.03) = $103M / 0.07 = $1,471M",
      },
      {
        question: "Which of the following is NOT a component of unlevered free cash flow?",
        options: ["EBIT", "Interest Expense", "CapEx", "Change in NWC"],
        correctAnswer: 1,
        explanation: "Unlevered FCF specifically excludes interest expense; it's cash flow available to all investors before debt payments",
      },
      {
        question: "What does it mean if a DCF yields an implied share price higher than the current price?",
        options: [
          "The stock is overvalued",
          "The stock is fairly valued",
          "The stock is potentially undervalued",
          "The DCF is wrong",
        ],
        correctAnswer: 2,
        explanation: "If DCF value exceeds current price, the stock may be undervalued based on intrinsic value",
      },
      {
        question: "A company has EBIT of $100M, tax rate of 30%, D&A of $20M, CapEx of $25M, and NWC increases by $10M. What is FCF?",
        options: ["$55M", "$70M", "$85M", "$100M"],
        correctAnswer: 0,
        explanation: "FCF = EBIT(1-tax) + D&A - CapEx - ΔNWC = $100M(0.7) + $20M - $25M - $10M = $70M + $20M - $25M - $10M = $55M",
      },
      {
        question: "Why do we add back depreciation when calculating free cash flow?",
        options: [
          "It's a cash expense",
          "It's a non-cash expense that reduced EBIT",
          "To increase the valuation",
          "It's required by regulation",
        ],
        correctAnswer: 1,
        explanation: "Depreciation is a non-cash expense that reduced EBIT, so we add it back to get to cash flow",
      },
      {
        question: "What happens to DCF value if you increase the discount rate (WACC)?",
        options: [
          "Value increases",
          "Value decreases",
          "Value stays the same",
          "It depends on growth rate",
        ],
        correctAnswer: 1,
        explanation: "Higher discount rate means future cash flows are worth less today, decreasing present value",
      },
      {
        question: "Which terminal value method is more commonly used in practice?",
        options: [
          "Perpetuity Growth Method",
          "Exit Multiple Method",
          "Both equally",
          "Neither is used",
        ],
        correctAnswer: 1,
        explanation: "Exit Multiple Method is more common as it's market-based and easier to justify; often both are shown for comparison",
      },
    ],
    openEnded: [
      {
        question: "Walk me through a DCF analysis from start to finish.",
        sampleAnswer: "First, I project the company's unlevered free cash flows for 5-10 years based on assumptions about revenue growth, margins, CapEx, and working capital. Second, I calculate the terminal value using either the perpetuity growth method or exit multiple method. Third, I calculate WACC as the discount rate. Fourth, I discount all the projected FCFs and terminal value back to present value. Fifth, I sum these to get Enterprise Value, then subtract net debt to get Equity Value, and divide by shares outstanding to get implied value per share. Finally, I conduct sensitivity analysis on key assumptions like WACC and growth rate.",
        keyPoints: [
          "Project unlevered FCF for 5-10 years",
          "Calculate terminal value (perpetuity growth or exit multiple)",
          "Determine WACC as discount rate",
          "Discount all cash flows to present value and sum for EV",
          "Subtract net debt, divide by shares for per-share value",
          "Perform sensitivity analysis",
        ],
      },
      {
        question: "What are the advantages and disadvantages of DCF analysis?",
        sampleAnswer: "Advantages: Based on intrinsic value and fundamentals, not market sentiment; captures company-specific factors; can value private companies; less affected by market volatility. Disadvantages: Highly sensitive to assumptions (WACC, growth rate, margins); terminal value often represents 60-80% of total value; requires detailed forecasts; garbage in, garbage out—bad assumptions yield bad valuations; doesn't reflect market sentiment or comparable transactions.",
        keyPoints: [
          "Advantages: Intrinsic value, company-specific, fundamental-based",
          "Disadvantages: Sensitive to assumptions, terminal value dominance",
          "Can be manipulated through assumptions",
          "Requires detailed forecasting and analysis",
        ],
      },
      {
        question: "How do you calculate WACC?",
        sampleAnswer: "WACC = (E/V × Cost of Equity) + (D/V × Cost of Debt × (1 - Tax Rate)), where E is equity value, D is debt value, and V is total value (E+D). Cost of Equity is typically calculated using CAPM: Risk-free rate + Beta × Equity Risk Premium. Cost of Debt is the company's current borrowing rate. The debt component is tax-effected because interest is tax-deductible. Each component is weighted by its proportion of total capital.",
        keyPoints: [
          "WACC blends cost of equity and after-tax cost of debt",
          "Weighted by market value proportions of each",
          "Cost of equity from CAPM: Rf + Beta × Risk Premium",
          "Debt is tax-effected due to interest deductibility",
        ],
      },
      {
        question: "Why might terminal value be a large percentage of total DCF value?",
        sampleAnswer: "Terminal value often represents 60-80% of total DCF value for several reasons: 1) It captures cash flows in perpetuity (forever) beyond the forecast period, 2) For mature, stable companies, most of their value is in steady-state operations, 3) The forecast period is typically only 5-10 years while the company may operate for decades, 4) Even though distant cash flows are heavily discounted, there are infinite periods, so they sum to a large value. This is why terminal value assumptions are critical to the valuation.",
        keyPoints: [
          "Represents cash flows in perpetuity (infinite periods)",
          "Forecast period is short relative to company life",
          "Even discounted heavily, infinite periods sum to large value",
          "Makes terminal value assumptions critically important",
        ],
      },
      {
        question: "How would you sanity-check your DCF output?",
        sampleAnswer: "Several ways: 1) Compare implied multiples (EV/EBITDA, EV/Revenue) from the DCF to market comps—if way off, investigate, 2) Check that perpetuity growth rate is reasonable (2-3%, similar to GDP growth), 3) Verify WACC is in a sensible range for the industry, 4) Ensure the terminal value isn't an unreasonable percentage of total value, 5) Run sensitivity analyses to see how value changes with different assumptions, 6) Compare FCF margins to historical results and peers. If results seem way off, revisit assumptions.",
        keyPoints: [
          "Compare implied multiples to market comps",
          "Check perpetuity growth rate reasonableness",
          "Verify WACC is industry-appropriate",
          "Run sensitivity analysis on key drivers",
          "Compare to historical performance and peers",
        ],
      },
    ],
  },
  ma: {
    flashcards: [
      {
        question: "What is a merger?",
        answer: "A combination of two companies where they agree to become one entity",
      },
      {
        question: "What is an acquisition?",
        answer: "When one company purchases another company or its assets",
      },
      {
        question: "What is accretion/dilution analysis?",
        answer: "Analysis showing whether an acquisition increases (accretion) or decreases (dilution) the acquirer's EPS",
      },
      {
        question: "What are synergies?",
        answer: "Cost savings or revenue enhancements that result from combining two companies",
      },
      {
        question: "What is a stock deal?",
        answer: "An acquisition where the buyer pays with its own stock instead of cash",
      },
      {
        question: "What is a cash deal?",
        answer: "An acquisition where the buyer pays with cash",
      },
      {
        question: "What is a hostile takeover?",
        answer: "An acquisition attempt that is opposed by the target company's management and board",
      },
      {
        question: "What is a friendly acquisition?",
        answer: "An acquisition that is negotiated and agreed upon by both companies' boards",
      },
      {
        question: "What is a horizontal merger?",
        answer: "A merger between companies in the same industry that are competitors",
      },
      {
        question: "What is a vertical merger?",
        answer: "A merger between companies at different stages of the supply chain",
      },
      {
        question: "What are cost synergies?",
        answer: "Savings from eliminating redundant operations, consolidating functions, or improving efficiency",
      },
      {
        question: "What are revenue synergies?",
        answer: "Additional revenue from cross-selling, new markets, or enhanced products resulting from the merger",
      },
    ],
    quiz: [
      {
        question: "Acquirer has EPS of $2.00 and buys a target. Post-deal EPS is $2.10. Is this accretive or dilutive?",
        options: ["Accretive", "Dilutive", "Neutral", "Cannot determine"],
        correctAnswer: 0,
        explanation: "Accretive because post-deal EPS ($2.10) is higher than pre-deal EPS ($2.00)",
      },
      {
        question: "Which payment method is typically more accretive to the acquirer's EPS?",
        options: ["Cash", "Stock", "Both equal", "Neither"],
        correctAnswer: 0,
        explanation: "Cash is typically more accretive because it doesn't dilute shares outstanding (assuming cash deal doesn't require expensive debt)",
      },
      {
        question: "Why do companies pursue M&A?",
        options: [
          "Only to increase revenue",
          "To achieve synergies, enter new markets, acquire talent/technology",
          "Only to reduce competition",
          "To increase stock price short-term",
        ],
        correctAnswer: 1,
        explanation: "Companies pursue M&A for multiple strategic reasons including synergies, market expansion, capabilities acquisition, and scale benefits",
      },
      {
        question: "In a stock-for-stock merger, if the acquirer's stock falls between announcement and close, what happens?",
        options: [
          "Target shareholders receive less value",
          "Deal terms automatically adjust",
          "Nothing changes",
          "Deal is cancelled",
        ],
        correctAnswer: 0,
        explanation: "In a fixed exchange ratio stock deal, target shareholders receive fewer dollars if acquirer stock falls (unless there's a collar protection)",
      },
      {
        question: "What typically happens to the target's stock price when an acquisition is announced?",
        options: [
          "It decreases",
          "It increases toward the offer price",
          "It doesn't change",
          "It becomes worthless",
        ],
        correctAnswer: 1,
        explanation: "Target stock typically jumps to near the offer price, reflecting the acquisition premium",
      },
      {
        question: "Which of the following would be a revenue synergy?",
        options: [
          "Eliminating duplicate corporate offices",
          "Cross-selling products to combined customer base",
          "Reducing headcount",
          "Consolidating manufacturing",
        ],
        correctAnswer: 1,
        explanation: "Cross-selling to a larger customer base creates new revenue, making it a revenue synergy",
      },
      {
        question: "What is goodwill created in an acquisition?",
        options: [
          "The target's brand value",
          "Purchase price minus fair value of net assets",
          "Projected synergies",
          "The target's customer relationships",
        ],
        correctAnswer: 1,
        explanation: "Goodwill is the excess of purchase price over the fair value of identifiable net assets acquired",
      },
    ],
    openEnded: [
      {
        question: "Walk me through an accretion/dilution analysis.",
        sampleAnswer: "First, I'd calculate the purchase price for the target and determine the financing mix (cash, stock, debt). Second, I'd project the combined company's net income, starting with standalone projections for acquirer and target, adding synergies, and adjusting for new financing costs (interest on debt or dilution from stock). Third, I'd calculate new shares outstanding if stock is used. Fourth, I'd calculate pro forma EPS (combined net income / pro forma shares). Finally, I'd compare pro forma EPS to the acquirer's standalone EPS. If pro forma is higher, the deal is accretive; if lower, it's dilutive.",
        keyPoints: [
          "Determine purchase price and financing structure",
          "Project combined net income including synergies and financing costs",
          "Calculate pro forma shares outstanding",
          "Compare pro forma EPS to acquirer's standalone EPS",
        ],
      },
      {
        question: "What makes an acquisition accretive versus dilutive?",
        sampleAnswer: "Accretion/dilution depends on several factors: 1) Purchase price (lower price more likely accretive), 2) Target's earnings yield relative to acquirer's cost of capital (if target's P/E is lower than acquirer's, typically accretive), 3) Financing method (cash usually more accretive than stock), 4) Synergies (cost savings improve combined earnings), 5) Interest expense from debt financing. Generally, if you're buying cheap earnings and paying with expensive stock, it's accretive; buying expensive earnings with your cheap stock is dilutive.",
        keyPoints: [
          "Target's P/E vs acquirer's P/E matters",
          "Cash financing typically more accretive than stock",
          "Synergies improve accretion",
          "Lower purchase price = more accretive",
        ],
      },
      {
        question: "Why might a company prefer a stock deal over a cash deal?",
        sampleAnswer: "Reasons for preferring stock: 1) Preserve cash for operations or other uses, 2) Avoid taking on debt, 3) Share risk with target shareholders (they participate in upside/downside), 4) If acquirer stock is overvalued, it's 'cheaper' currency, 5) Target shareholders may prefer tax deferral (stock deals can be tax-free), 6) Acquirer may not have enough cash or debt capacity. However, stock deals dilute existing shareholders and expose acquirer to deal risk if its stock falls.",
        keyPoints: [
          "Preserves cash and debt capacity",
          "Shares risk with target shareholders",
          "Can be tax-advantaged for target shareholders",
          "Useful when acquirer stock is highly valued",
        ],
      },
      {
        question: "What are the key risks in M&A transactions?",
        sampleAnswer: "Major risks include: 1) Integration risk—difficulty combining operations, cultures, and systems, 2) Overpaying—failing to create value if purchase price exceeds true value, 3) Synergies don't materialize—cost savings or revenue gains fall short, 4) Key talent leaves, 5) Customer or revenue attrition post-deal, 6) Hidden liabilities or problems in due diligence, 7) Regulatory issues blocking or requiring modifications, 8) Acquirer management distraction from core business. Many acquisitions fail to create value for the acquirer's shareholders.",
        keyPoints: [
          "Integration challenges (operations, culture, systems)",
          "Overpaying destroys value",
          "Synergies may not materialize",
          "Talent and customer attrition",
          "Hidden liabilities, regulatory hurdles",
        ],
      },
      {
        question: "How do you value synergies in an M&A transaction?",
        sampleAnswer: "Synergies are valued by estimating the incremental cash flows they create and discounting to present value. For cost synergies, estimate savings (redundant facilities, headcount, vendors) and timing, then tax-effect them and present value. For revenue synergies (harder to estimate), project incremental revenue from cross-selling or new markets, estimate margins, and discount. Apply a probability or haircut since synergies are uncertain. Typically, 70-80% of identified synergies might be included in valuation. Cost synergies are more credible and given more weight than revenue synergies, which are speculative.",
        keyPoints: [
          "Estimate incremental cash flows from synergies",
          "Tax-effect and discount to present value",
          "Apply probability/haircut for uncertainty",
          "Cost synergies more credible than revenue synergies",
        ],
      },
    ],
  },
  lbo: {
    flashcards: [
      {
        question: "What is an LBO?",
        answer: "Leveraged Buyout—acquiring a company using a significant amount of debt, with the target's cash flows servicing the debt",
      },
      {
        question: "Who typically sponsors LBOs?",
        answer: "Private Equity firms",
      },
      {
        question: "What are the key drivers of returns in an LBO?",
        answer: "Deleveraging (debt paydown), operational improvements (EBITDA growth), and multiple expansion",
      },
      {
        question: "What is a typical LBO debt/equity split?",
        answer: "60-70% debt, 30-40% equity (can vary)",
      },
      {
        question: "What is the typical LBO holding period?",
        answer: "3-7 years, with 5 years being common",
      },
      {
        question: "What is IRR in the context of LBOs?",
        answer: "Internal Rate of Return—the annualized return to the equity investors over the holding period",
      },
      {
        question: "What is an exit multiple?",
        answer: "The EV/EBITDA multiple at which the PE firm sells the company at exit",
      },
      {
        question: "What types of debt are used in LBOs?",
        answer: "Senior debt (bank loans, revolver), subordinated debt (mezzanine), and sometimes high-yield bonds",
      },
      {
        question: "What is a dividend recap?",
        answer: "When an LBO company takes on additional debt to pay a dividend to equity holders",
      },
      {
        question: "What characteristics make a good LBO target?",
        answer: "Strong, stable cash flows, low CapEx requirements, opportunities for operational improvement, strong market position",
      },
      {
        question: "What is the equity check in an LBO?",
        answer: "The amount of equity that the private equity sponsor invests upfront",
      },
      {
        question: "How does debt paydown create value in an LBO?",
        answer: "As debt is paid down, equity value increases because equity is the residual after debt claims",
      },
    ],
    quiz: [
      {
        question: "A PE firm buys a company for $500M with $350M debt and $150M equity. After 5 years, debt is paid down to $200M and the company is sold for $600M EV. What is the equity return?",
        options: ["$100M", "$400M", "$250M", "$300M"],
        correctAnswer: 2,
        explanation: "Exit equity value = Exit EV - Remaining Debt = $600M - $200M = $400M. Return = $400M - $150M initial equity = $250M",
      },
      {
        question: "What is typically the largest source of returns in a leveraged buyout?",
        options: [
          "Multiple expansion",
          "EBITDA growth",
          "Debt paydown/deleveraging",
          "Dividend recaps",
        ],
        correctAnswer: 2,
        explanation: "Deleveraging (debt paydown) is typically the largest driver, though all three factors contribute",
      },
      {
        question: "Why do PE firms prefer companies with stable cash flows for LBOs?",
        options: [
          "They're cheaper to buy",
          "Stable cash flows are needed to service the debt",
          "They grow faster",
          "They have more employees",
        ],
        correctAnswer: 1,
        explanation: "High debt loads require consistent cash generation to make interest and principal payments",
      },
      {
        question: "If entry and exit multiples are the same, and EBITDA is flat, what drives returns?",
        options: [
          "Nothing—there are no returns",
          "Multiple expansion",
          "Debt paydown only",
          "Revenue growth",
        ],
        correctAnswer: 2,
        explanation: "With flat EBITDA and multiples, only deleveraging creates value for equity holders",
      },
      {
        question: "What happens to equity value as debt is paid down in an LBO?",
        options: [
          "Equity value decreases",
          "Equity value stays the same",
          "Equity value increases",
          "Equity disappears",
        ],
        correctAnswer: 2,
        explanation: "As debt decreases, equity (the residual claim) captures that value, increasing equity value",
      },
      {
        question: "Which of the following is NOT a typical exit strategy for a PE firm?",
        options: [
          "Sale to a strategic buyer",
          "Sale to another PE firm",
          "IPO",
          "Bankruptcy",
        ],
        correctAnswer: 3,
        explanation: "Bankruptcy is a failure, not an exit strategy. Common exits are strategic sale, secondary sale to another PE firm, or IPO",
      },
      {
        question: "If a company is purchased at 8x EBITDA with 70% debt and EBITDA is $50M, what is the equity check?",
        options: ["$280M", "$120M", "$400M", "$50M"],
        correctAnswer: 1,
        explanation: "Purchase price = 8 × $50M = $400M. Equity = 30% × $400M = $120M",
      },
    ],
    openEnded: [
      {
        question: "Walk me through a basic LBO model.",
        sampleAnswer: "First, I'd determine the purchase price using an entry multiple (e.g., 8x EBITDA) and sources/uses of funds, showing debt and equity. Second, I'd project the company's financials for 5 years, focusing on revenue growth, EBITDA margins, and cash flow available for debt paydown. Third, I'd build a debt schedule showing annual principal and interest payments. Fourth, I'd calculate the exit value using an exit multiple and EBITDA in year 5. Fifth, I'd subtract remaining debt from exit enterprise value to get exit equity value. Finally, I'd calculate IRR and multiple of money (MoM) based on initial equity and exit equity value.",
        keyPoints: [
          "Determine purchase price, sources and uses (debt/equity split)",
          "Project 5-year financials and cash flow",
          "Build debt schedule showing paydown",
          "Calculate exit value (exit multiple × exit EBITDA)",
          "Subtract remaining debt to get exit equity value",
          "Calculate IRR and MoM returns",
        ],
      },
      {
        question: "What are the three main value creation levers in an LBO?",
        sampleAnswer: "The three levers are: 1) Deleveraging/debt paydown—using cash flow to reduce debt, which increases equity value since equity is the residual, 2) EBITDA growth—through revenue growth and/or margin improvement via operational improvements, 3) Multiple expansion—selling at a higher exit multiple than the entry multiple, though this is often assumed to be flat conservatively. Deleveraging is typically the most reliable driver, EBITDA growth requires operational skill, and multiple expansion is market-dependent and hardest to control.",
        keyPoints: [
          "Deleveraging: debt paydown increases equity value",
          "EBITDA growth: operational improvements drive earnings up",
          "Multiple expansion: selling at higher multiple than purchase",
          "Deleveraging most reliable, multiple expansion least controllable",
        ],
      },
      {
        question: "How do you calculate the IRR in an LBO?",
        sampleAnswer: "IRR is the discount rate that sets the present value of the exit equity proceeds equal to the initial equity investment. It's calculated by finding the rate 'r' where: Initial Equity Investment = Exit Equity Value / (1+r)^years. For example, if $100M equity investment returns $250M after 5 years, solve for r in: $100M = $250M/(1+r)^5, giving an IRR of about 20%. Most LBOs target 20%+ IRRs. You can use Excel's IRR or XIRR function, or use a financial calculator.",
        keyPoints: [
          "IRR equates PV of exit proceeds to initial investment",
          "Solve for discount rate: Initial Equity = Exit Equity / (1+r)^years",
          "Target IRRs typically 20%+",
          "Use Excel IRR/XIRR function or financial calculator",
        ],
      },
      {
        question: "What characteristics make a company a good LBO candidate?",
        sampleAnswer: "Good LBO candidates have: 1) Strong, predictable cash flows to service debt, 2) Low CapEx requirements so cash can pay down debt rather than fund investments, 3) Strong market position and defensible business, 4) Opportunities for operational improvements or cost savings, 5) Management team that can be retained or improved, 6) Non-cyclical business (reduces risk of cash flow shortfalls), 7) Opportunity to cut costs or improve margins. Industries like healthcare, business services, and consumer staples are common LBO sectors.",
        keyPoints: [
          "Strong, stable cash flows to service high debt load",
          "Low CapEx needs",
          "Opportunities for operational improvement",
          "Defensible market position",
          "Non-cyclical business reduces risk",
        ],
      },
      {
        question: "Why would a PE firm do a dividend recapitalization?",
        sampleAnswer: "A dividend recap is when the LBO company takes on additional debt to pay a dividend to the PE firm. Reasons: 1) Return capital to investors earlier while still holding the company, 2) Improve fund-level returns if the recap is done when the company has performed well, 3) Lock in some gains while maintaining upside exposure, 4) Fund distributions when exits are limited (e.g., poor M&A/IPO markets). Risks include increasing leverage, reducing financial flexibility, and potentially hurting the company's ability to invest or weather downturns.",
        keyPoints: [
          "Add debt to pay dividend to PE firm",
          "Returns capital while maintaining ownership",
          "Improves fund returns and provides liquidity",
          "Risks: increased leverage, reduced flexibility",
        ],
      },
    ],
  },
};
