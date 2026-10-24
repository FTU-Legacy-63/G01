# **INDIVIDUAL FOOTPRINT**

**Member Name:** Nguyen Minh Trang 

**Student ID:** 2412380050

**Role:** UI/UX Design, Information Architecture & Player Experience

### **1\. My main responsibility**

In this project, I took full ownership of the User Experience (UX) and User Interface (UI) design for "Pitch & Ledger". My role went beyond mere aesthetics, it centered on **Financial Information Architecture and Player Journey Design**.

I was responsible for:

* Translating complex valuation models, raw financial data, and investment scenarios into an intuitive Decision Support System.  
* Building the interactive prototype and establishing the visual design system.  
* Designing the user flow to ensure players could absorb a high volume of financial data without cognitive overload, enabling them to make informed "Invest" or "Reject" decisions.

### **2\. My concrete outputs**

To achieve the project goals, I created the following specific deliverables:

**2.1. Interactive Prototype & User Flow Mapping:**

* Documented comprehensive user flows (Happy path, Alternative path, Error path) for the investment process.  
  * **Happy Path:** the ideal sequence of evaluating a pitch, reading documents, and investing).  
  * **Alternative Path**   
  * **Error Paths**:  
    * E1 (Incomplete Checklist): Locks confirm button if Checklist is incomplete.  
    * E2 (Below Minimum Capital): Snaps slider back if pulled below minimum capital.  
    * E3 (Invalid State Conflict): Disables slider automatically upon selecting "Reject".  
    * E4 (Fund Depletion): Disables "Invest" if remaining fund balance is insufficient, guiding player to "Reject".  
* Built a fully clickable prototype featuring time-based UI states (e.g., "Game play \- Morning" and "Game play \- Evening" modes) to simulate a realistic working environment.

**2.2. Tutorial & Onboarding Interface:**

* Designed the initial Start and Tutorial screens to smoothly onboard new players. This included visual guides explaining the core mechanics of the game (Pitch Deck, Documents, Investigation, Decision) before they enter the complex simulation.

**2.3. Scalable Figma Component Library:**

* Transitioned from static pop-ups to smooth screen-to-screen interactions using Figma's **Interactive Components and Variants**.  
* Built reusable custom UI controls specific to financial decision-making, including interactive Sliders for capital allocation, interactive Checkboxes for the Due Diligence checklist, and dynamic Navigation/Document tabs.

**2.4. Data Visualization System:**

* Designed the **Gradient Benchmark bars** (Revenue Growth, Gross/Net Margins, Debt/Assets) and **Market Size bar charts** to instantly translate raw industry data into visual risk and growth indicators for the player.

**2.5. Financial Document Architecture:**

* Redesigned the standard, plain-text startup documents into structured, professional PDF reports (Industry Overview, Company Overview, Financial Statements).  
* Extracted critical parameters (e.g., Funding Ask, Pre/Post-money Valuation) into distinct Highlight Cards at the top of the PDF, ensuring players can instantly grasp the most important investment metrics at a glance.  
* Applied a \#FFFBF9 off-white background, structured split-view layouts, and strict typographic alignment rules to eliminate the "wall of text" effect and reduce reading fatigue.

**2.6. Visual Assets & Character Design:**

* Created a cohesive set of vector visual assets, including the 5-tier investment ecosystem icons (Minnow to Shark).  
* Designed multiple **Character expression variants** (different facial expressions and states for the founder) to make the Q\&A pitching sessions dynamic and responsive to gameplay.  
* Designed dual-state environmental lighting (Morning Pitch vs. Evening Boardroom Q\&A variants) to establish psychological pacing and enhance immersion across the 5-round due diligence simulation.

**2.7 End-Game Final Investment Report Interface:** 

Designed the comprehensive final assessment dashboard, integrating multi-layer outputs: Gamified Shark Tier visual ranking, aggregate portfolio ROI tracking, and an analytical case-by-case due diligence feedback engine comparing player choices against predefined benchmarks. 

### **3\. Evidence links**

* **Interactive Prototype & Design Workings:** [Figma \- PBL Group 5: Pitch & Ledger](https://www.figma.com/design/mLkkIjiFqhksbILlCUw6zF/PBL-Group-5?node-id=107-147&t=KR5zcPlcvGjy0Lfx-1)  
* **Redesigned Company Overview PDFs:** [Google Drive Folder](https://drive.google.com/drive/folders/1MG0F9797oGYLYfHjwCpFVkCbndvrwMTw?usp=sharing)  
* **User Flow Tables:** [User Flow Design](https://docs.google.com/document/d/1zgVvz1iYpYHH8MqOHaSd2kW9Fm3yPzLRFarM6XLWCEA/edit?tab=t.s55aa0chx66n#heading=h.8jjp9wuu6dsc)

### **4\. How my work is used**

My UX/UI design serves as the critical interface between the game's underlying financial logic and the player's decision-making process.

* **Player Onboarding:** The Tutorial screens ensure players understand the financial simulation's rules and UI mechanics before facing complex data.  
* **Guided Navigation:** The structured "Happy Path" prevents players from getting lost among multiple panels. It seamlessly guides them from listening to the founder's pitch, to verifying claims in the Documents tab, and finally to the Decision making screen.  
* **Decision Support:** Spreadsheets generated by the finance team are translated through my visual components (Gradient bars, Highlight Cards, structured PDFs). This allows players to rapidly assess a startup's financial health against industry peers and execute their "Invest" or "Reject" decisions confidently.  
* **Data Processing:** By visually isolating key metrics (e.g., Pre/Post-money Valuation, Funding Ask) and organizing data logically, players can rapidly assess a startup's financial health against industry peers.

### **5\. Integration, testing and revision**

My workflow involved continuous collaboration and iteration:

* **Integration with Game Logic:** Collaborated closely with Lê Đắc Phú Minh (Game Code/Logic) to ensure the UI grid layout (1920x1080) and interactive cards provided sufficient, flexible space to accurately display dynamic data variables called from the backend.  
* **Integration with Financial Data:** Worked with the finance team to ensure the visual representations (like the Gradient bars, the documents) accurately reflected the underlying mathematical models and industry benchmarks.  
* **Testing and Revision (Addressing the "Wall of Text"):** During internal testing, I identified a critical UX issue: the initial "Document/Company Overview" screen presented a "Wall of Text," causing reading fatigue.  
  * *Revision:* I immediately overhauled the architecture by extracting critical valuation parameters into distinct Highlight Cards at the top of the page. I changed the background to off-white (\#FFFBF9) to reduce contrast glare and increased line-heights to provide visual breathing room.  
* **Refining Interactive States:** Transitioned from using static pop-ups (overlays) to smooth screen-to-screen component variants to prevent accidental misclicks during the investigation phase.

### **6\. Remaining limitation**

The current UI system and Figma constraints are exclusively optimized for a 16:9 Desktop aspect ratio (1920x1080). This design choice was made to allow the side-by-side display of multiple financial data panels, which is crucial for the game's core mechanics. Consequently, the design lacks a fully responsive architecture, meaning the layout will break or the text will become illegible if a user attempts to play the game on mobile devices or vertically oriented tablets.

Besides, while the visual architecture successfully reduces reading fatigue, the interface currently lacks contextual micro-interactions (such as hover-state Tooltips or an inline Glossary) for financial jargon. Since the target audience includes F0 investors, the absence of these on-screen explanations might still cause cognitive friction when they encounter complex terms like "Burn Rate" or "Implied Valuation".

