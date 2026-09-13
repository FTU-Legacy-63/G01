**SAMPLE CALCULATION & LOGIC TEST**

Hereby testing our logic by performing sample calculations, along with some extreme inputs as a limit test to our formulas

**Scenario 1: Standard Inputs**  
**Initial Capital: 200**

|  | ROI | Max Investable Equity | Founder's (Fixed) Valuation | Max Investable | Player Invest | Investment Return |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Firm A | 0.7 | 20% | 500 | 100 | 100 | 70 |
| Firm B  | 0.3 | 25% | 400 | 100 | 0 | 0 |
| Firm C  | \-0.3 | 35% | 200 | 70 | 50 | \-15 |
| Firm D | \-0.85 | 45% | 300 | 135 | 25 | \-21.25 |
| **Final Capital**  | **233.75** |  |  | **405** | **175** | **33.75** |

**Potential error if: 1\) Player invests more than Max Investable. 2\) Total player investment is larger than initial capital**

|  |  | Return Score |
| :---: | :---: | :---: |
| Portfolio Return | 16.88% | 40 |
| Checklist Accuracy | 0.72 | 72 |
| Overall Performance  | 56 | Average |

**Scenario 2: No investment but perfect checklist answers**  
**Initial Capital: 200**

|  | ROI | Max Investable Equity | Founder's (Fixed) Valuation | Max Investable | Player Invest | Investment Return |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Firm A | 0.7 | 20% | 500 | 100 | 0 | 0 |
| Firm B  | 0.3 | 25% | 400 | 100 | 0 | 0 |
| Firm C  | \-0.3 | 35% | 200 | 70 | 0 | 0 |
| Firm D | \-0.85 | 45% | 300 | 135 | 0 | 0 |
| **Final Capital**  | **200** |  |  | **405** | **0** | **0** |

|  |  | Return Score |
| :---: | :---: | :---: |
| Portfolio Return | 0.00% | 20 |
| Checklist Accuracy | 1 | 100 |
| Overall Performance  | 60 | Average |

**Scenario 3: Optimal investment but no correct checklist answers**  
**Initial Capital: 200**

|  | ROI | Max Investable Equity | Founder's (Fixed) Valuation | Max Investable | Player Invest | Investment Return |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Firm A | 0.7 | 20% | 500 | 100 | 100 | 70 |
| Firm B  | 0.3 | 25% | 400 | 100 | 100 | 30 |
| Firm C  | \-0.3 | 35% | 200 | 70 | 0 | 0 |
| Firm D | \-0.85 | 45% | 300 | 135 | 0 | 0 |
| **Final Capital**  | **300** |  |  | **405** | **200** | **100** |

|  |  | Return Score |
| :---: | :---: | :---: |
| Portfolio Return | 50.00% | 100 |
| Checklist Accuracy | 0 | 0 |
| Overall Performance  | 50 | Average |

