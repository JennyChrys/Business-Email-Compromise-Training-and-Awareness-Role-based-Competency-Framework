# RBCF: Business Email Compromise Training and Awareness

**Live site:** https://jennychrys.github.io/Business-Email-Compromise-Training-and-Awareness-Role-based-Competency-Framework/.

An interactive, five-page website for the Role-Based BEC Competency Framework (RBCF), a University of Queensland capstone project (CYBR7901 and CYBR7902). It introduces business email compromise (BEC), shows how six roles are targeted, and lets people practise: spot the red flags in a realistic email, then make a decision in a phone-call or video-call scenario.

It is a static site (HTML, CSS and plain JavaScript). There is no build step, no framework and no server.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: the introduction film, role picker, options, sources, capstone and contact details |
| `overview.html` | The Background page (shown in the menu as "Background"): the ten BEC attack patterns with a role filter, and the Detect, Verify, Contain pipeline |
| `roles.html` | Why six roles, a clickable diagram and comparison, and links to the six modules |
| `exercises.html` | Exercises for all six roles. Each role has two Spot the Red Flag emails, two decision games and two knowledge checks. A "Where you stand" panel shows a practice score, a bar each for Detect, Verify and Contain, and a next step. Results are saved in the visitor's own browser only |
| `try.html` | "What's in the box": a three-minute taster from the HR and Payroll module (scenario video, spot the red flag, a decision) |
| `impact.html` | How the training helps in your work (role flip cards) |

## Project structure

```
index.html  overview.html  roles.html  exercises.html  try.html  impact.html
css/styles.css      all styling (colours are the variables at the top)
js/data.js          ALL content and configuration (edit this to change anything)
js/app.js           behaviour, commented section by section
modules/            the six PowerPoint modules (downloaded from the site)
assets/             intro.mp4, intro.vtt and intro_poster.jpg (the introduction film); pay_video.mp4 and pay_poster.jpg (the sample scenario video)
```

## How it works

Every page loads `js/data.js`, which defines one object, `window.RBCF`, then `js/app.js`, which reads `<body data-page="...">` and runs the code for that page. The spot-the-red-flag and decision engines (`mountSpot`, `mountGame`) are used by the "What's in the box" page.

### Data model (`js/data.js`)

| Key | What it holds |
|---|---|
| `links` | The six module files in `modules/`, keyed by role: `ap`, `adm`, `cs`, `ex`, `pay`, `it` |
| `contacts` | Supervisors and student researcher shown in the home page footer. Leave `email` empty to show no email line |
| `roles` | Name, focus, goal, lure and control for each role |
| `spots` | For each role, two emails. Each email is a list of lines made of segments. A segment is `[text]`, or `[text, "f1"]` for a red flag, or `[text, "d1"]` for an ordinary phrase |
| `games` | For each role, two decision games with options, outcomes (`S` stopped, `P` partly right, `F` fraud succeeded) and a debrief |
| `kcs` | For each role, two knowledge checks: `phase` (Verify or Contain), `q` (the question), `opts` (three options), `ans` (the index of the correct option, 0 to 2) and `why` (the explanation). Copied from the modules |
| `phases` | Background page: the Detect, Verify, Contain pipeline |
| `vectors`, `flow`, `cialdini`, `clickfix` | Not used by the site now. They hold the content of sections that were removed because the film and the modules already cover it. Safe to delete, or to reuse if you want those sections back. |

### Change the sample on the "What's in the box" page

The page shows one email and one decision game from the HR and Payroll module. To show a different role, change `R.spots.pay[0]` and `R.games.pay[0]` in `initTry()` in `js/app.js` (for example to `R.spots.ap[0]`), and replace `assets/pay_video.mp4` and `assets/pay_poster.jpg` with that role's scenario video and a still from it. The text of the scenario and the module link are in `try.html`.

## Run it locally (VS Code)

1. Open this folder with **File, then Open Folder**.
2. Install the **Live Server** extension (Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server**.

Without Live Server, double-click `index.html`, or run `python -m http.server 8000` here and visit http://localhost:8000.

## Module links

The six modules are PowerPoint decks in the `modules/` folder, so the site does not depend on OneDrive, SharePoint or any other cloud service. Choosing a module downloads the file. It is meant to be opened in PowerPoint on a computer and run as a slide show (press F5, sound on), because the narration and the clickable choices need the desktop app.

| Role | File |
|---|---|
| Executive | `modules/BEC_Training_Executive.pptx` |
| Accounts Payable | `modules/BEC_Training_AccountsPayable.pptx` |
| HR and Payroll | `modules/BEC_Training_HR_Payroll.pptx` |
| Customer Service | `modules/BEC_Training_CustomerService.pptx` |
| IT Staff | `modules/BEC_Training_IT.pptx` |
| Administrative | `modules/BEC_Training_Administrative.pptx` |

Each module has two buttons. **Download the module** saves the file. **Open in PowerPoint** launches the desktop app straight from the page, using Microsoft's Office URI scheme (`ms-powerpoint:ofv|u|` followed by the address of the file). It needs PowerPoint installed and the site to be online, and the file opens read-only. If it opens in Protected View, click Enable Editing before pressing F5.

A third button, **Open online (OneDrive)**, opens the same module from OneDrive in the browser. Those links are in the `onedrive` key of `js/data.js`, one per role. To change one, replace the link there. If a link stops working, check that the file is still shared as "Anyone with the link can view".

To replace a module, upload a new file with the same name to `modules/`. The links are in the `links` key of `js/data.js`. Each file is 10 to 14 MB, well under GitHub's 100 MB limit.

## Publish with GitHub Pages

1. Create a repository and upload everything in this folder, keeping `css`, `js` and `assets`.
2. Go to **Settings, then Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
3. The site appears at `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

On a free GitHub account, Pages needs a public repository. If the repository is private, add your supervisors as collaborators so they can open it.

## Accessibility

Keyboard operable (all controls are buttons or links), visible focus rings, reduced-motion support (animations are skipped when the visitor prefers it), and colour is never the only signal in the sample activities.

## Sources

FBI Internet Crime Complaint Center, 2025 Annual Report. FBI IC3 public service announcements I-091124-PSA, I-061118-PSA and I-120324-PSA. CISA and FBI Advisory AA23-320A. Australian Signals Directorate, Annual Cyber Threat Report 2024 to 2025. Microsoft, Digital Defense Report 2025. Push Security, "The state of ClickFix" (September 2026). Canadian Centre for Cyber Security, pretexting guidance. US Federal Trade Commission, gift card alert. US Internal Revenue Service, W-2 scam warning. Cialdini, R. B., "Harnessing the Science of Persuasion", Harvard Business Review (2001).

## Context

Capstone research project (CYBR7901 and CYBR7902), Master of Cybersecurity (Cyber Defence), The University of Queensland. Ethics approval 2026/HE011221.


## Introduction film (home page)

The home page opens with a short film in the "Watch the introduction" section.

- `assets/intro.mp4` is the film (1280x720, about 8 MB). To replace it, keep the same file name.
- `assets/intro_poster.jpg` is the still image shown before it plays.
- `assets/intro.vtt` holds the captions. They are switched on from the video controls (CC).
- The transcript and the line about the synthetic narration are in `index.html`, in the section with `id="intro"`. If the film changes, update the transcript text there too.


## BEC taxonomy (Background page)

The Background page includes the ten BEC attack patterns the training is built on, with a role filter. The rows are plain HTML in `overview.html`, in the section with `id="taxonomy"`. To change a pattern, its triggers or the roles it targets, edit that row. The `data-roles` value on each row controls the filter (ex, ap, pay, cs, it, adm, or all).


## What was removed, and why

The introduction film, the modules and the website all repeated the same teaching content. The website now has one job: help people find their role, practise, and see the evidence. Removed from the site:

- The animated numbers block on the Home page (the film shows the numbers; the sources are listed in the footer of the Home page).
- The animated attack flow, the three ways in (flip cards), the Cialdini diagram, the ClickFix step-through, the definition and the numbers on the Overview page. All of this is taught in each module or shown in the film.
- The IT scenario video from the site, because it is shown in the capstone presentation instead.

## Credits and licences

- **AI disclosure.** The film’s narration is a synthetic voice (a voice-conversion model trained on the author’s own voice). Some of the film footage and the illustrated scenario characters are AI-generated. This is also stated on the Home page.
- **Fictional scenarios.** Every organisation, person, email address and phone number in the training scenarios is invented. Any resemblance to a real organisation is unintended.
- **Fonts.** The site loads its fonts from Google Fonts (fonts.googleapis.com). Nothing else is loaded from outside this repository.
- **Sources.** The sources behind the facts and figures are listed in the footer of the Home page.
- **Licence.** No licence has been chosen yet. Until one is added, the material may be viewed but not reused or redistributed without permission. To ask about reuse, contact the author through the details on the Home page.
- **Privacy.** The Exercises page keeps your results in your own browser (localStorage) so you can see where you stand. Nothing is sent anywhere, there is no tracking, and "Reset my progress" clears it. The practice score is feedback for the learner. It is not a validated test.
