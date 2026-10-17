/* RBCF site data. Edit LINKS and CONTACTS here; the rest is the exercise content. */
window.RBCF = {
 "vectors": [
  {
   "name": "Email",
   "icon": "email",
   "text": "A lookalike domain, or a real mailbox the attacker has taken over, sends a believable request with a deadline. A familiar thread and signature make it feel safe."
  },
  {
   "name": "Voice",
   "icon": "voice",
   "text": "A cloned voice calls with borrowed authority. Calling back on the number the attacker gave you checks nothing, because the attacker answers."
  },
  {
   "name": "Video",
   "icon": "video",
   "text": "A deepfake face on a live call, sometimes with several familiar faces. It feels safe because everyone on the call seems to agree."
  }
 ],
 "flow": [
  {
   "n": "1",
   "t": "Research",
   "d": "The attacker studies names, roles and relationships in your organisation.",
   "more": "Public profiles, press releases and old emails show who approves payments and who reports to whom. You rarely see this stage happen."
  },
  {
   "n": "2",
   "t": "Spoof",
   "d": "A lookalike domain, a cloned voice or a deepfake face, built to mimic someone you trust.",
   "more": "A recorded talk or interview can be enough to clone a voice, and a single swapped letter can fake a domain."
  },
  {
   "n": "3",
   "t": "Urgency",
   "d": "A deadline and borrowed authority, designed to make you skip verification.",
   "more": "The request is ordinary, the deadline is tight, and there is often a reason you cannot call. This is the moment the training is built for."
  },
  {
   "n": "4",
   "t": "Redirect",
   "d": "Money or data moves to the attacker, often before anyone notices.",
   "more": "Payments are often moved on quickly, so telling your bank at once gives the best chance of freezing them."
  }
 ],
 "cialdini": [
  {
   "g": "cog",
   "name": "Authority",
   "quote": "\"Your CEO needs this done now\"",
   "how": "Impersonates a senior executive to invoke hierarchical compliance.",
   "sample": "Your CEO needs this done now. Please release the transfer before the board call.",
   "counter": "A title is not proof. Confirm through the staff directory or a number you already hold."
  },
  {
   "g": "cog",
   "name": "Scarcity",
   "quote": "\"Transfer immediately, deadline today\"",
   "how": "Artificial urgency compresses the decision window and prevents verification.",
   "sample": "Transfer immediately. The deadline is today and we cannot miss it.",
   "counter": "A real request survives a five-minute check. If it cannot wait for one, that is the red flag."
  },
  {
   "g": "cog",
   "name": "Social proof",
   "quote": "\"Legal and finance already approved\"",
   "how": "A false consensus signals that others validated the request, reducing suspicion.",
   "sample": "Legal and finance have already approved this. I just need you to process it.",
   "counter": "Ask the people named, through a channel you already hold, before you act."
  },
  {
   "g": "rel",
   "name": "Liking",
   "quote": "\"Can you help me personally?\"",
   "how": "Exploits the desire to assist trusted colleagues or managers.",
   "sample": "Can you help me personally with something quick? I would really appreciate it.",
   "counter": "Kindness is not a control. You can be friendly and still verify."
  },
  {
   "g": "rel",
   "name": "Commitment and consistency",
   "quote": "\"You already started the process\"",
   "how": "Consistency bias drives completion of a fraudulent request once it has started.",
   "sample": "You already started the process last week, so please just finish it today.",
   "counter": "A half-finished request is still a new request. Check it from the beginning."
  },
  {
   "g": "rel",
   "name": "Reciprocity",
   "quote": "\"After everything I've done for you\"",
   "how": "An implied obligation overrides critical evaluation of the request.",
   "sample": "After everything I've done for you, I need this one favour.",
   "counter": "Past favours do not change the process. The check applies to everyone."
  }
 ],
 "clickfix": [
  {
   "t": "A fake security check on a web page",
   "d": "A page reached from a search result or a compromised site says \"Verify you are human\" or \"Fix this problem\"."
  },
  {
   "t": "You paste a command to \"fix\" it",
   "d": "The page has already copied a command for you and asks you to paste it into a Run box or terminal. It feels like a routine step."
  },
  {
   "t": "It steals saved passwords and sessions",
   "d": "The command installs software that takes your saved passwords and the sessions that keep you signed in."
  },
  {
   "t": "A real mailbox is taken over",
   "d": "With a stolen session, the attacker can get into a real mailbox without needing to guess anything."
  },
  {
   "t": "The BEC message comes from a real address",
   "d": "The request now arrives from a genuine address, inside genuine threads, with a genuine signature. It looks legitimate. It is not."
  }
 ],
 "roles": {
  "pay": {
   "name": "HR and Payroll",
   "focus": "Direct-deposit changes, staff data requests and payroll portals.",
   "goal": "Divert pay to a new account, or obtain staff records such as tax file numbers.",
   "lure": "A direct-deposit change from a familiar address, an executive asking for staff data for an audit, a text about multi-factor authentication for payroll.",
   "control": "Confirm changes through the system of record, hold the first payment to a new account, and never email staff data on request."
  },
  "cs": {
   "name": "Customer Service",
   "focus": "Authentication, pretexting and account takeover by phone and video.",
   "goal": "Take over a customer account, redirect a payout or obtain customer data.",
   "lure": "A caller who claims authority and skips your questions, a payout request from a customer's real email address, a voice you recognise, or a video call offered as proof of identity.",
   "control": "Strong authentication the caller cannot supply: a code to the registered device, or a callback to the number on file."
  },
  "adm": {
   "name": "Administrative",
   "focus": "Acting for executives: legal letters, gift cards and confidential requests.",
   "goal": "Act as the proxy for an executive: buy gift cards, pay an invoice, or follow confidential instructions.",
   "lure": "A law firm demanding secrecy, a CEO email or text asking for gift cards, a scanned document with a QR code, a call that sounds like a manager.",
   "control": "Verify through official contact details, never the message's own. A request to stay quiet is the part to act on first."
  },
  "ap": {
   "name": "Accounts Payable",
   "focus": "Vendor bank-detail changes, invoices and payment release.",
   "goal": "Redirect a payment by changing a vendor's bank details, or hurry an invoice through.",
   "lure": "A hijacked email thread, an overdue invoice from a lookalike domain, or a vendor call or video call asking you to confirm new bank details.",
   "control": "Call the vendor on the number in your vendor master file before any bank detail changes. An unanswered call is not a pass."
  },
  "it": {
   "name": "IT Staff",
   "focus": "MFA resets, tokens, audit requests and emergency access.",
   "goal": "Obtain access: an MFA reset, a token, an approval or a log extract.",
   "lure": "A locked-out colleague in a hurry, an urgent call from the IT Director, an audit email asking for system logs, an emergency request on a video call from the CISO.",
   "control": "A ticket records a request, it does not prove who made it. Verify identity by callback to a directory number, and use the break-glass procedure."
  },
  "ex": {
   "name": "Executive",
   "focus": "Authority, deepfake calls and the executive's own account.",
   "goal": "Exploit authority: get an instruction obeyed, or take over an executive's own account.",
   "lure": "An urgent call from the Chair, a video call with several directors, an email from \"IT\" asking you to verify credentials or relay a code.",
   "control": "A protocol built on channels attackers cannot reach, followed by its owner, and explicit permission for staff to hold the line."
  }
 },
 "order": [
  "pay",
  "cs",
  "adm",
  "ap",
  "it",
  "ex"
 ],
 "links": {
  "ap": "modules/BEC_Training_AccountsPayable.pptx",
  "adm": "modules/BEC_Training_Administrative.pptx",
  "cs": "modules/BEC_Training_CustomerService.pptx",
  "ex": "modules/BEC_Training_Executive.pptx",
  "pay": "modules/BEC_Training_HR_Payroll.pptx",
  "it": "modules/BEC_Training_IT.pptx"
 },
 "contacts": [
  {
   "name": "Dr Priyanka Singh",
   "role": "Primary supervisor",
   "org": "School of Electrical Engineering and Computer Science, The University of Queensland",
   "email": ""
  },
  {
   "name": "Dr James Carlopio",
   "role": "Co-supervisor",
   "org": "The University of Queensland",
   "email": ""
  },
  {
   "name": "Ida Jenifer Jayaprakasam",
   "role": "Student researcher",
   "org": "Master of Cybersecurity (Cyber Defence), The University of Queensland",
   "email": "s4927217@uq.edu.au"
  }
 ],
 "spots": {
  "pay": [
   {
    "title": "Round 1: a bank-details change",
    "lines": [
     {
      "label": "From:",
      "segs": [
       [
        "Derek T. <d.thompson@"
       ],
       [
        "brightpath-corp.com",
        "f5"
       ],
       [
        ">"
       ]
      ]
     },
     {
      "label": "Subject:",
      "segs": [
       [
        "Bank Details Update:",
        "d1"
       ],
       [
        " "
       ],
       [
        "Urgent, Before Friday's Pay Run",
        "f1"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "Hi Maya,",
        "d2"
       ],
       [
        " "
       ],
       [
        "my bank closed my old account.",
        "d3"
       ],
       [
        " "
       ],
       [
        "I need this Friday's pay to go to a new one,",
        "f3"
       ],
       [
        " "
       ],
       [
        "sorry for the late notice!",
        "f2"
       ],
       [
        " Details attached. "
       ],
       [
        "Thanks, Derek",
        "f4"
       ]
      ]
     }
    ],
    "flags": {
     "f1": [
      "A deadline tied to Friday's pay run",
      "It is designed to rush the decision."
     ],
     "f2": [
      "An apology that disarms",
      "\"Sorry for the late notice\" makes the urgency feel considerate, not suspicious."
     ],
     "f3": [
      "Process bypass",
      "Bank-detail changes should go through HR's self-service system, not a casual email to Payroll."
     ],
     "f4": [
      "No verification",
      "Nothing here actually proves it's Derek, just a name and a request."
     ],
     "f5": [
      "A lookalike domain",
      "brightpath-corp.com has a hyphen. The real company domain is brightpathcorp.com. Easy to miss at a glance."
     ]
    },
    "levers": [
     [
      "Scarcity",
      "A tight deadline makes you skip the check."
     ],
     [
      "Liking",
      "A polite, friendly tone lowers your guard."
     ]
    ],
    "note": "",
    "takeaway": "",
    "sources": "FBI IC3 PSA I-091124-PSA (misspelled domain names); Cialdini, HBR (2001)"
   },
   {
    "title": "Round 2: staff data for an \"audit\"",
    "lines": [
     {
      "label": "From:",
      "segs": [
       [
        "Priya Raman, Chief Financial Officer",
        "f2"
       ],
       [
        " <p.raman@brightpathcorp.com>"
       ]
      ]
     },
     {
      "label": "Subject:",
      "segs": [
       [
        "URGENT and confidential: employee data for the audit"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "Maya,",
        "d1"
       ],
       [
        " "
       ],
       [
        "the auditors need",
        "f5"
       ],
       [
        " the full employee list today: "
       ],
       [
        "names, dates of birth, tax file numbers and bank details.",
        "f1"
       ],
       [
        " "
       ],
       [
        "Send it to me directly by 3 pm.",
        "f3"
       ],
       [
        " "
       ],
       [
        "Please do not copy anyone else in, this is confidential.",
        "f4"
       ],
       [
        " "
       ],
       [
        "Thanks, Priya",
        "d2"
       ]
      ]
     }
    ],
    "flags": {
     "f1": [
      "Staff data by email",
      "Tax file numbers and bank details should never be sent on request."
     ],
     "f2": [
      "Authority asks directly",
      "The \"CFO\" asks you directly, skipping HR and Privacy."
     ],
     "f3": [
      "A tight deadline",
      "\"By 3 pm\" leaves no time to check."
     ],
     "f4": [
      "Secrecy",
      "\"Do not copy anyone else in\" cuts you off from the people who would check."
     ],
     "f5": [
      "A vague reason",
      "\"The audit\", with no audit reference."
     ]
    },
    "levers": [
     [
      "Authority",
      "People comply when someone senior asks."
     ],
     [
      "Scarcity",
      "Little time means little checking."
     ]
    ],
    "note": "Plus secrecy: nobody else sees it, so nobody can check.",
    "takeaway": "No executive request justifies emailing staff data. Confirm through a known contact and use only approved secure channels.",
    "sources": "IRS (W-2 scam warning); FBI IC3 PSA I-091124-PSA; Cialdini, HBR (2001)"
   }
  ],
  "cs": [
   {
    "title": "Round 1: a payout account change",
    "lines": [
     {
      "label": "From:",
      "segs": [
       [
        "Daniel Whitfield <daniel.whitfield@mailbox-example.com.au>",
        "f5"
       ]
      ]
     },
     {
      "label": "Subject:",
      "segs": [
       [
        "Re: Withdrawal WD-204817 (pending)",
        "d1"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "Hi Priya,",
        "d2"
       ],
       [
        " "
       ],
       [
        "my old bank account was closed after my card was compromised.",
        "f4"
       ],
       [
        " "
       ],
       [
        "Please pay my pending withdrawal (AUD 18,400) to my new account: D Whitfield, BSB 000-000, account 00000000.",
        "f1"
       ],
       [
        " "
       ],
       [
        "I'm travelling and can't take calls, but I check email.",
        "f2"
       ],
       [
        " "
       ],
       [
        "I need it today, as I have a deposit due Friday.",
        "f3"
       ]
      ]
     }
    ],
    "flags": {
     "f1": [
      "A payout account change by email",
      "Requested by email only."
     ],
     "f2": [
      "A reason that blocks the obvious check",
      "\"I can't take calls\"."
     ],
     "f3": [
      "A deadline",
      "\"Today\", because a deposit is due Friday."
     ],
     "f4": [
      "A believable story",
      "The old account was closed after a card was compromised."
     ],
     "f5": [
      "A real address, possibly taken over",
      "It comes from the customer's real address, inside a real thread, so the mailbox may have been taken over."
     ]
    },
    "levers": [
     [
      "Scarcity",
      "A tight deadline makes you skip the check."
     ],
     [
      "Liking",
      "A believable story lowers your guard."
     ]
    ],
    "note": "",
    "takeaway": "Email can be taken over. Use a check the attacker can't reach: the number on file, or a code to the registered mobile.",
    "sources": "FBI IC3 PSA I-091124-PSA; Cialdini, HBR (2001)"
   },
   {
    "title": "Round 2: a \"regulator\" notice",
    "lines": [
     {
      "label": "From:",
      "segs": [
       [
        "Office of Financial Conduct <notices@ofc-compliance-example.com>",
        "f5"
       ]
      ]
     },
     {
      "label": "Subject:",
      "segs": [
       [
        "STATUTORY NOTICE: customer records required "
       ],
       [
        "within 2 hours",
        "f3"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "Under section 14 you must release "
       ],
       [
        "the full account history and identity documents for customer K. Alvarez",
        "f1"
       ],
       [
        " within two hours. "
       ],
       [
        "Failure to comply is an offence and will be referred for penalty.",
        "f2"
       ],
       [
        " Reference OFC-2291. "
       ],
       [
        "Your manager and Legal do not need to be contacted.",
        "f4"
       ],
       [
        " Reply to this email with the records."
       ]
      ]
     }
    ],
    "flags": {
     "f1": [
      "A full-records request by email",
      "A request for a customer's full records and identity documents."
     ],
     "f2": [
      "A threat of penalty",
      "\"Failure to comply is an offence\"."
     ],
     "f3": [
      "A short deadline",
      "\"Within two hours\"."
     ],
     "f4": [
      "Isolation",
      "It tells you not to involve your manager or Legal."
     ],
     "f5": [
      "A sender you cannot trust",
      "A reference number the sender supplied proves nothing, and the domain is not the regulator's official one."
     ]
    },
    "levers": [
     [
      "Authority",
      "A regulator's name makes people comply."
     ],
     [
      "Scarcity",
      "Little time means little checking."
     ]
    ],
    "note": "Plus fear of a penalty, which is pressure, not proof.",
    "takeaway": "A legal-sounding request is still just a request. Verify it through official public contact details, and confirm with your manager and Legal before releasing anything.",
    "sources": "Canadian Centre for Cyber Security (pretexting); Cialdini, HBR (2001)"
   }
  ],
  "adm": [
   {
    "title": "Round 1: a law firm demands a transfer",
    "lines": [
     {
      "label": "From:",
      "segs": [
       [
        "Sarah Whitfield, Senior Partner <s.whitfield@caldwell-harrington-legal.com>",
        "f4"
       ]
      ]
     },
     {
      "label": "Subject:",
      "segs": [
       [
        "CONFIDENTIAL: Immediate Action Required"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "Attachment: Payment_Instructions.pdf",
        "f5"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "This matter is time-sensitive and strictly confidential. "
       ],
       [
        "We require an urgent transfer of AUD 18,500",
        "f3"
       ],
       [
        " "
       ],
       [
        "before end of business today.",
        "f2"
       ],
       [
        " "
       ],
       [
        "Please do not discuss this with anyone in your office, including your manager, until it is resolved.",
        "f1"
       ]
      ]
     }
    ],
    "flags": {
     "f1": [
      "Secrecy",
      "\"Do not discuss this, including your manager\" isolates you from the one person who could catch it."
     ],
     "f2": [
      "A rushed deadline",
      "\"Before end of business today\"."
     ],
     "f3": [
      "Process bypass",
      "Payment details are attached directly, with no invoice or purchase order to check against."
     ],
     "f4": [
      "An unconfirmed law firm",
      "The firm name has never been independently confirmed."
     ],
     "f5": [
      "An unexpected attachment",
      "Payment instructions arrive as a file, outside your normal process."
     ]
    },
    "levers": [
     [
      "Authority",
      "A law firm's name makes people comply."
     ],
     [
      "Scarcity",
      "Little time means little checking."
     ]
    ],
    "note": "Plus secrecy, which stops anyone checking.",
    "takeaway": "Criminals impersonate executives, law firms and trusted vendors to trigger payments.",
    "sources": "FBI IC3 PSA I-061118-PSA; Cialdini, HBR (2001)"
   },
   {
    "title": "Round 2: a CEO asks for gift cards",
    "lines": [
     {
      "label": "From:",
      "segs": [
       [
        "Elena Park, CEO <elena.park@northridge-group.com>"
       ]
      ]
     },
     {
      "label": "Subject:",
      "segs": [
       [
        "Quick favour",
        "d1"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "I'm in back-to-back meetings and "
       ],
       [
        "can't talk.",
        "f2"
       ],
       [
        " I need 5 gift cards for a client "
       ],
       [
        "by 3 pm.",
        "f3"
       ],
       [
        " "
       ],
       [
        "Buy them and email me the codes.",
        "f1"
       ],
       [
        " "
       ],
       [
        "I'll reimburse you.",
        "f5"
       ],
       [
        " "
       ],
       [
        "Please keep this between us.",
        "f4"
       ],
       [
        " "
       ],
       [
        "Elena",
        "d2"
       ]
      ]
     }
    ],
    "flags": {
     "f1": [
      "Gift cards by email",
      "A request to buy them and send the codes."
     ],
     "f2": [
      "A reason that blocks the obvious check",
      "\"Can't talk\"."
     ],
     "f3": [
      "A deadline",
      "\"By 3 pm\" leaves no time to check."
     ],
     "f4": [
      "Secrecy",
      "\"Keep this between us\" cuts you off from the people who would check."
     ],
     "f5": [
      "A promise that makes it feel safe",
      "\"I'll reimburse you\"."
     ]
    },
    "levers": [
     [
      "Authority",
      "People comply when the CEO asks."
     ],
     [
      "Reciprocity",
      "A promise to repay makes a favour feel fair."
     ]
    ],
    "note": "Plus secrecy and a tight deadline.",
    "takeaway": "Only scammers ask for gift card numbers and PINs. Check through the CEO's office, on a number from the directory.",
    "sources": "FTC gift card alert; Cialdini, HBR (2001)"
   }
  ],
  "ap": [
   {
    "title": "Round 1: a hijacked invoice thread",
    "lines": [
     {
      "label": "From:",
      "segs": [
       [
        "Dana Whitfield <dana.whitfield@stratton-supplies.com>"
       ]
      ]
     },
     {
      "label": "Subject:",
      "segs": [
       [
        "Re: Invoice 20418 for September",
        "d1"
       ]
      ]
     },
     {
      "label": "Earlier in the thread:",
      "segs": [
       [
        "\"Invoice 20418 for September is attached, due in 14 days.\"",
        "d3"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "Hi, thanks for confirming receipt.",
        "d2"
       ],
       [
        " "
       ],
       [
        "We changed banks last week,",
        "f2"
       ],
       [
        " so please pay invoice 20418 to the new account below: "
       ],
       [
        "BSB 000-000, account 00000000.",
        "f1"
       ],
       [
        " "
       ],
       [
        "A late fee of 5% applies if it isn't received today.",
        "f3"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "Dana Whitfield, Accounts, Stratton Supplies,",
        "f5"
       ],
       [
        " "
       ],
       [
        "07 5550 0142",
        "f4"
       ]
      ]
     }
    ],
    "flags": {
     "f1": [
      "A bank-detail change by email, inside a thread",
      "A real thread proves nothing."
     ],
     "f2": [
      "An ordinary reason",
      "\"We changed banks last week\"."
     ],
     "f3": [
      "A late-fee threat",
      "\"5% if it isn't received today\"."
     ],
     "f4": [
      "A phone number in the signature",
      "Calling it checks nothing."
     ],
     "f5": [
      "A familiar signature and invoice number",
      "Copied from earlier emails."
     ]
    },
    "levers": [
     [
      "Authority",
      "A vendor's name and signature make it feel safe to obey."
     ],
     [
      "Scarcity",
      "A deadline and a penalty make you skip the check."
     ]
    ],
    "note": "Plus trust in a familiar thread.",
    "takeaway": "Check bank-detail changes through a number from your vendor master file.",
    "sources": "FBI IC3 PSA I-091124-PSA; Cialdini, HBR (2001)"
   },
   {
    "title": "Round 2: an overdue invoice",
    "lines": [
     {
      "label": "From:",
      "segs": [
       [
        "Accounts, Stratton Supplies <accounts@stratton-supplies"
       ],
       [
        ".co",
        "f4"
       ],
       [
        ">"
       ]
      ]
     },
     {
      "label": "Subject:",
      "segs": [
       [
        "Updated bank details: this month's invoice is overdue"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "Hi,",
        "d1"
       ],
       [
        " "
       ],
       [
        "this month's invoice",
        "f5"
       ],
       [
        " "
       ],
       [
        "is now overdue.",
        "f2"
       ],
       [
        " "
       ],
       [
        "Our bank details changed after a system upgrade,",
        "f1"
       ],
       [
        " so please pay it today to: BSB 000-000, account 00000000. Thanks, "
       ],
       [
        "Accounts Team",
        "f3"
       ]
      ]
     }
    ],
    "flags": {
     "f1": [
      "New bank details by email only",
      "With a \"system upgrade\" as the excuse."
     ],
     "f2": [
      "Overdue and \"today\"",
      "Pressure to pay before you check."
     ],
     "f3": [
      "A generic sign-off",
      "\"Accounts Team\", with no named contact."
     ],
     "f4": [
      "A lookalike domain",
      "Ending in .co, not the vendor's usual .com."
     ],
     "f5": [
      "No invoice number",
      "No invoice number or purchase order to match against your records."
     ]
    },
    "levers": [
     [
      "Scarcity",
      "\"Overdue\" and \"today\" put a clock on you."
     ]
    ],
    "note": "Plus a lookalike domain that is easy to miss.",
    "takeaway": "When your usual check goes unanswered, the pressure peaks. Hold the new details and keep trying.",
    "sources": "FBI IC3 PSA I-091124-PSA; Cialdini, HBR (2001)"
   }
  ],
  "it": [
   {
    "title": "Round 1: a locked-out colleague",
    "lines": [
     {
      "label": "From:",
      "segs": [
       [
        "James R. <james.r@"
       ],
       [
        "northbrldge-finance.com",
        "f1"
       ],
       [
        ">"
       ]
      ]
     },
     {
      "label": "Subject:",
      "segs": [
       [
        "Locked out: urgent MFA reset",
        "d1"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "Hi, it's James from Finance.",
        "d2"
       ],
       [
        " "
       ],
       [
        "I'm locked out and I've got a payment run due in ten minutes.",
        "f2"
       ],
       [
        " "
       ],
       [
        "Can you just reset my MFA now?",
        "d3"
       ],
       [
        " "
       ],
       [
        "I don't have time to log a ticket,",
        "f3"
       ],
       [
        " "
       ],
       [
        "my manager already knows about this.",
        "f4"
       ],
       [
        " "
       ],
       [
        "Please, I really need this now.",
        "f5"
       ]
      ]
     }
    ],
    "flags": {
     "f1": [
      "A lookalike domain",
      "northbrldge-finance.com swaps an i for an l. This is called typosquatting: a lookalike domain that swaps similar-looking characters."
     ],
     "f2": [
      "A deadline",
      "A payment run \"due in ten minutes\" is used to justify skipping verification."
     ],
     "f3": [
      "Process bypass",
      "\"I don't have time to log a ticket\", when a ticket exists for exactly this."
     ],
     "f4": [
      "Unverifiable authority",
      "\"My manager already knows\" is named but not checkable in the moment."
     ],
     "f5": [
      "Emotional pressure",
      "\"I really need this now\" leans on empathy to override procedure."
     ]
    },
    "levers": [
     [
      "Scarcity",
      "A ten-minute deadline leaves no time to check."
     ],
     [
      "Liking",
      "A friendly plea for help lowers your guard."
     ]
    ],
    "note": "Plus a named manager who cannot be checked.",
    "takeaway": "",
    "sources": "FBI IC3 PSA I-091124-PSA; Cialdini, HBR (2001)"
   },
   {
    "title": "Round 2: an \"audit\" for system logs",
    "lines": [
     {
      "label": "From:",
      "segs": [
       [
        "External Audit Team <compliance@"
       ],
       [
        "financial-audit-services.com",
        "f5"
       ],
       [
        ">"
       ]
      ]
     },
     {
      "label": "Subject:",
      "segs": [
       [
        "URGENT: System Logs and Access Records Required Today"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "To IT Security, as part of our current compliance review",
        "d1"
       ],
       [
        " "
       ],
       [
        "we require immediate access to your system logs, configuration data and access records for the past quarter.",
        "f1"
       ],
       [
        " This is time-sensitive, so please send the requested files directly to this email "
       ],
       [
        "today",
        "f2"
       ],
       [
        " "
       ],
       [
        "to avoid delays in your certification.",
        "f3"
       ],
       [
        " Regards, "
       ],
       [
        "External Audit Team",
        "f4"
       ]
      ]
     }
    ],
    "flags": {
     "f1": [
      "System data by email",
      "Logs and access records should never be sent on request."
     ],
     "f2": [
      "\"Today\"",
      "A deadline that leaves no time to check."
     ],
     "f3": [
      "A consequence that adds pressure",
      "\"To avoid delays in your certification\"."
     ],
     "f4": [
      "A generic sign-off",
      "\"External Audit Team\", with no named contact."
     ],
     "f5": [
      "An unchecked domain",
      "A domain not checked against your auditor's real contact details."
     ]
    },
    "levers": [
     [
      "Authority",
      "An auditor's name makes people comply."
     ],
     [
      "Scarcity",
      "A deadline leaves little time to check."
     ]
    ],
    "note": "Plus a threat to your certification.",
    "takeaway": "Audits are real, but a deadline is not a reason to skip verification. Confirm the auditor through official contact details.",
    "sources": "FBI IC3 PSA I-091124-PSA; Cialdini, HBR (2001)"
   }
  ],
  "ex": [
   {
    "title": "Round 1: \"IT\" asks you to verify credentials",
    "lines": [
     {
      "label": "From:",
      "segs": [
       [
        "IT Service Desk <it-support@"
       ],
       [
        "yourcompany-secure.com",
        "f4"
       ],
       [
        ">"
       ]
      ]
     },
     {
      "label": "Subject:",
      "segs": [
       [
        "Action Required: Verify Your Account Credentials",
        "f1"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "We've detected "
       ],
       [
        "unusual sign-in activity on your account.",
        "f2"
       ],
       [
        " To keep your account secure, please verify your credentials "
       ],
       [
        "within 24 hours. Failure to do so may result in temporary account suspension.",
        "f3"
       ],
       [
        " "
       ],
       [
        "IT Service Desk",
        "f5"
       ]
      ]
     }
    ],
    "flags": {
     "f1": [
      "A request to verify credentials",
      "A message from \"IT\" that asks you to verify your credentials."
     ],
     "f2": [
      "A fear-based reason",
      "\"Unusual sign-in activity\"."
     ],
     "f3": [
      "A deadline and a penalty",
      "\"Within 24 hours\", with a threat of suspension."
     ],
     "f4": [
      "A lookalike domain",
      "yourcompany-secure.com is not your company's real domain."
     ],
     "f5": [
      "Not the normal IT process",
      "It is sent directly to you, not through the normal IT process."
     ]
    },
    "levers": [
     [
      "Authority",
      "An IT desk's name makes people comply."
     ],
     [
      "Scarcity",
      "A deadline and a penalty make you skip the check."
     ]
    ],
    "note": "Plus fear of losing access.",
    "takeaway": "IT will not ask you to verify credentials by email. Report it, and sign in only through the official portal.",
    "sources": "CISA and FBI AA23-320A; Cialdini, HBR (2001)"
   },
   {
    "title": "Round 2: \"IT\" asks you to relay a code",
    "lines": [
     {
      "label": "From:",
      "segs": [
       [
        "IT Support <it-support@"
       ],
       [
        "yourcompany-secure.com",
        "f4"
       ],
       [
        ">"
       ]
      ]
     },
     {
      "label": "Subject:",
      "segs": [
       [
        "Quick Verification Needed"
       ]
      ]
     },
     {
      "label": "",
      "segs": [
       [
        "Hi,",
        "d1"
       ],
       [
        " "
       ],
       [
        "we're updating security settings on your account.",
        "f2"
       ],
       [
        " "
       ],
       [
        "You'll receive a 6-digit verification code shortly.",
        "f3"
       ],
       [
        " "
       ],
       [
        "Please reply with that code",
        "f1"
       ],
       [
        " so we can confirm the update went through. "
       ],
       [
        "Thanks,",
        "d2"
       ],
       [
        " "
       ],
       [
        "IT Support",
        "f5"
       ]
      ]
     }
    ],
    "flags": {
     "f1": [
      "A request to relay a verification code",
      "A one-time code must never be shared."
     ],
     "f2": [
      "No link to click",
      "So nothing looks dangerous."
     ],
     "f3": [
      "The code really does arrive",
      "It arrives \"shortly\", which makes the request feel genuine."
     ],
     "f4": [
      "The same lookalike domain as before",
      "yourcompany-secure.com again."
     ],
     "f5": [
      "A casual tone with no named person",
      "It reads like a routine message, but nobody is named."
     ]
    },
    "levers": [
     [
      "Authority",
      "An IT team's name makes people comply."
     ],
     [
      "Liking",
      "A friendly, casual tone lowers your guard."
     ]
    ],
    "note": "Plus timing: the real code arrives just as promised.",
    "takeaway": "Relaying that code can hand an attacker your account. Never share a one-time code with anyone who contacts you.",
    "sources": "CISA and FBI AA23-320A; Cialdini, HBR (2001)"
   }
  ]
 },
 "games": {
  "pay": [
   {
    "type": "Phone call",
    "title": "THE DIRECT DEPOSIT CALL",
    "setup": "Same request as before, but this time it is a phone call. A familiar voice says her bank account was frozen and she needs tomorrow's pay in a new account. The HR portal is down until Monday and the pay run locks at 2 pm. Your process: bank details change only through the portal, and urgent pay exceptions go to the HR manager.",
    "options": [
     {
      "title": "Take the new details by phone, and enter them with a note that she confirmed.",
      "body": "",
      "kind": "F"
     },
     {
      "title": "Leave her account unchanged for this run, and pass the request to the HR manager.",
      "body": "",
      "kind": "S"
     },
     {
      "title": "Ask her to email a signed change form, and hold it until the portal is back.",
      "body": "",
      "kind": "P"
     }
    ],
    "outcomes": {
     "F": {
      "title": "PAYMENT MISDIRECTED",
      "text": "The note makes the change look approved, and tomorrow's pay goes to the new account. On Monday the real employee calls, confused: she never asked for a change. The voice was cloned from a video interview posted months ago, and a note in the record is not verification."
     },
     "S": {
      "title": "ATTEMPT STOPPED",
      "text": "Her pay goes to the existing account as normal. The HR manager checks the HR record and reaches the real employee, who never called. The attempt is reported, and any change waits for the portal. A pay run lock is pressure, not authority."
     },
     "P": {
      "title": "PARTLY RIGHT",
      "text": "Nothing changes, so the fraud fails. But a signed form can be forged, nobody checked who was calling, and the HR manager never heard about it. The same caller can try a colleague on the next shift."
     }
    },
    "debrief": [
     "A cloned voice can sound exactly like a colleague, so the call itself proves nothing. The pressure came from the pay run lock, and the note “she confirmed by phone” is the workaround that makes an unverified change look approved.\nBank details change through the portal. When someone needs pay urgently, the exception goes to the HR manager, who can check her identity through the HR record. Passing it on is the control working, not you being unhelpful.",
     "Source: FBI IC3 PSA I-120324-PSA (AI-generated audio used to impersonate people)"
    ]
   },
   {
    "type": "Video call",
    "title": "THE AUDIT REQUEST",
    "setup": "A video call from an external auditor, demanding immediate access to payroll records. You know him and have seen him before, and he is on camera. He says the audit closes today and your manager has already agreed. Your process: audit requests come from Finance, and records go only through the secure audit folder.",
    "options": [
     {
      "title": "Put the records he names in the secure audit folder, and give him access.",
      "body": "",
      "kind": "F"
     },
     {
      "title": "Tell him you need his request in writing, then share the records when it arrives.",
      "body": "",
      "kind": "P"
     },
     {
      "title": "Ask Finance to confirm that the audit is scheduled, before you share anything.",
      "body": "",
      "kind": "S"
     }
    ],
    "outcomes": {
     "F": {
      "title": "RECORDS EXPOSED",
      "text": "The folder is secure, but the person you gave access to is not the auditor. He downloads the payroll file within minutes and disappears. There is no audit on record, and the real auditor confirms he never called. A secure channel protects the delivery, not the request."
     },
     "P": {
      "title": "PARTLY RIGHT",
      "text": "The request arrives within minutes from a lookalike address and reads like a real audit notice. Nothing is shared yet, but you still have not asked Finance whether an audit exists, and the pressure has simply moved to your inbox."
     },
     "S": {
      "title": "ATTEMPT STOPPED",
      "text": "Finance has no audit scheduled for today, and the real auditor confirms he never called. He is annoyed on the call, but nothing was shared and the attempt is reported."
     }
    },
    "debrief": [
     "A video call with a face you recognise can be a deepfake built from public footage, and “your manager already agreed” is a claim you cannot see. Using the secure folder looks like following the process, but the process starts with the request being real.\nAudit requests come through Finance. Ask Finance whether the audit exists before you share anything, however familiar the face.",
     "Source: FBI IC3 PSA I-120324-PSA (AI video in live chats with alleged executives)"
    ]
   }
  ],
  "cs": [
   {
    "type": "Phone call",
    "title": "THE REGIONAL MANAGER",
    "setup": "The voice sounds exactly like your regional manager. She says her mobile is flat, a VIP client is waiting, and she needs emergency access to the client's account right now. Your process: staff access to a client account needs an approved request in the CRM, under the requester's own login.",
    "options": [
     {
      "title": "Ask her to raise the access request in the CRM from her own login.",
      "body": "",
      "kind": "S"
     },
     {
      "title": "Pass her to the duty supervisor, and let them decide on the access.",
      "body": "",
      "kind": "P"
     },
     {
      "title": "Grant temporary access, and log the reason in the CRM under her name.",
      "body": "",
      "kind": "F"
     }
    ],
    "outcomes": {
     "S": {
      "title": "ATTEMPT STOPPED",
      "text": "She cannot: the caller has no login or MFA for her account. The real regional manager, who was in a client meeting all afternoon, never made the request. The VIP waits, but nothing was granted and you report the call."
     },
     "F": {
      "title": "ACCESS GRANTED: FRAUD SUCCEEDED",
      "text": "The log looks compliant, and the caller reads the client's data. The real regional manager never called; her voice was cloned from a company town hall recording. A log entry records the access, but it does not prove who asked for it."
     },
     "P": {
      "title": "PARTLY RIGHT",
      "text": "You avoid deciding alone, which is good. But the supervisor hears the same urgent story, the caller is still unverified, and the real manager has not been reached. Passing the call on is not the same as checking it."
     }
    },
    "debrief": [
     "A cloned voice can reproduce someone you recognise, and seniority plus a waiting VIP is a powerful lever. Granting access and logging it feels responsible, but the log only records the mistake.\nAccess to a client account needs an approved request under the requester's own login. If she is who she says, she can raise it; if she is not, she cannot.",
     "Sources: Canadian Centre for Cyber Security; Get Cyber Safe; FBI IC3 PSA I-120324"
    ]
   },
   {
    "type": "Video call",
    "title": "THE VIDEO ID CHECK",
    "setup": "A customer says he cannot pass the phone checks and offers a video call to prove who he is. His face matches the photo on file and he holds an ID up to the camera. He wants his email address and mobile number changed today. Your process: contact changes need a passed identity check, and each change sends a notice to the old contact.",
    "options": [
     {
      "title": "Match his face to the photo and check the ID, then make the change.",
      "body": "",
      "kind": "F"
     },
     {
      "title": "Make the change, and flag the account for review so the old email is notified.",
      "body": "",
      "kind": "P"
     },
     {
      "title": "Decline the change, and send the app identity check to his registered mobile.",
      "body": "",
      "kind": "S"
     }
    ],
    "outcomes": {
     "F": {
      "title": "ACCOUNT TAKEN OVER: FRAUD SUCCEEDED",
      "text": "The face matches the photo because it was built from it. The customer was never on the call: the face was a deepfake made from photos and video posted online, and the ID was AI-generated. Once the email and mobile were changed, every code went to the attacker."
     },
     "P": {
      "title": "PARTLY RIGHT",
      "text": "The notice goes to the old email, which is the right control, but only after the change. The attacker already has the new email and mobile, and may use them before the real customer reads it. Prevention would have stopped it; the notice only reports it."
     },
     "S": {
      "title": "ATTEMPT STOPPED",
      "text": "The check goes to the registered mobile. The real customer receives it, never asked for it, and tells you so. The change is declined and the fraud team is told."
     }
    },
    "debrief": [
     "A face and an ID held up to a camera are not an identity check: deepfakes and AI-generated IDs can pass both. Making the change and flagging it for review is a common workaround, but the notice arrives after the damage.\nUse the identity check built for this: the app check, sent to the contact details already on the account.",
     "Source: FBI IC3 PSA I-120324-PSA (AI-generated images and video)"
    ]
   }
  ],
  "adm": [
   {
    "type": "Phone call",
    "title": "THE URGENT CALL",
    "setup": "Your phone rings. It sounds exactly like your manager. She is stuck in meetings, needs 5 gift cards for a client by 3 pm, and asks you to buy them and read her the codes. She says she will reimburse you, and to keep it between you. Your process: gift cards are bought on a purchase request approved in the system.",
    "options": [
     {
      "title": "Tell her you will raise a purchase request for her to approve in the system.",
      "body": "",
      "kind": "S"
     },
     {
      "title": "Tell her you will buy them once she emails the request to you and Finance.",
      "body": "",
      "kind": "P"
     },
     {
      "title": "Buy them on your corporate card, and claim it back once she approves the expense.",
      "body": "",
      "kind": "F"
     }
    ],
    "outcomes": {
     "F": {
      "title": "CODES SENT: FRAUD SUCCEEDED",
      "text": "You buy the cards and read out the codes, and they are redeemed within minutes. The caller was not your manager: her voice was cloned from a recording of a company event. “Buy now, claim later” put the company's money, and your own card, at risk."
     },
     "S": {
      "title": "ATTEMPT STOPPED",
      "text": "You raise the request. The real manager gets the approval notice, never asked for it, and says so. No cards are bought, and the attempt is reported."
     },
     "P": {
      "title": "PARTLY RIGHT",
      "text": "You buy nothing for now, so the fraud fails. But the email arrives from a lookalike address and looks real, no purchase request exists, and your manager is still unaware. Nobody reports it, so the same caller can try the next assistant."
     }
    },
    "debrief": [
     "Secrecy plus a deadline is a classic gift card lever. A cloned voice can ask in your manager's tone, and buying now to claim back later is the workaround that skips the approval.\nGift cards go through a purchase request approved in the system. A real manager can approve it in a minute, and a fake one cannot.",
     "Sources: FBI IC3 PSA I-120324-PSA (AI-generated audio); FTC gift card alert"
    ]
   },
   {
    "type": "Video call",
    "title": "THE VIDEO CALL",
    "setup": "A video call from the CEO. Her face and voice look right, and she says her phone is broken. She asks you to pay a new supplier invoice of AUD 18,500 today and not to tell anyone, because the deal is confidential. Your process: new suppliers are set up by Accounts Payable, with two approvals.",
    "options": [
     {
      "title": "Pay it from the company bank portal with your own login, and send her the receipt.",
      "body": "",
      "kind": "F"
     },
     {
      "title": "Send the invoice to Accounts Payable as a new supplier, and tell the CEO's office.",
      "body": "",
      "kind": "S"
     },
     {
      "title": "Send it to Accounts Payable marked urgent, noting that the CEO has approved it.",
      "body": "",
      "kind": "P"
     }
    ],
    "outcomes": {
     "S": {
      "title": "ATTEMPT STOPPED",
      "text": "Accounts Payable starts the new-supplier checks, and the CEO's office says she made no such request. Nothing is paid, and the attempt is reported. “Tell no one” was the red flag; telling someone stopped it."
     },
     "F": {
      "title": "PAYMENT SENT: FRAUD SUCCEEDED",
      "text": "The payment goes out within the hour. The CEO was never on the call: the video was a deepfake built from recordings of her. Having portal access does not mean the process lets you pay, and the money was moved on before anyone noticed."
     },
     "P": {
      "title": "PARTLY RIGHT",
      "text": "You used the right route, but you passed on an approval you never saw. Under pressure, Accounts Payable may skip the new-supplier checks because the CEO is said to have signed off. The unverified claim travels with the invoice."
     }
    },
    "debrief": [
     "A deepfake video call from the CEO adds authority, secrecy and urgency at once. Paying it yourself is the workaround that skips the approvals, and “the CEO approved it” is a claim, not a record.\nNew suppliers go through Accounts Payable with two approvals. Tell the CEO's office, because a real CEO will not mind being checked.",
     "Sources: FBI IC3 PSA I-120324-PSA; CNN Business (Arup, 2024)"
    ]
   }
  ],
  "ap": [
   {
    "type": "Phone call",
    "title": "THE VENDOR CALL",
    "setup": "A call from “Mark” at TechSupply Corp, a supplier you pay every month. It sounds exactly like him. He says the old account is closed, he is travelling and can’t email, and he needs you to take the new bank details down now for this month’s payment. Your process: bank changes need a signed vendor change form, a callback to the contact on file, and a second approver.",
    "options": [
     {
      "title": "Take the details down, and enter the change with a note that he confirmed it by phone.",
      "body": "",
      "kind": "F"
     },
     {
      "title": "Ask him to email the signed change form, then process it once the approver signs.",
      "body": "",
      "kind": "P"
     },
     {
      "title": "Tell him changes need the signed form, and call the contact on file before approving.",
      "body": "",
      "kind": "S"
     }
    ],
    "outcomes": {
     "F": {
      "title": "PAYMENT SENT: FRAUD SUCCEEDED",
      "text": "The note tells the second approver the change was checked, so it is approved. The next payment goes to the new account. “Mark” was a voice clone, and the real vendor never called. The checker approved what the maker wrote."
     },
     "P": {
      "title": "PARTLY RIGHT",
      "text": "The form arrives and looks genuine. Nothing is paid yet, but nobody has called the vendor, and a signed form from the caller proves nothing. Whether this ends well now depends on the approver doing the callback you skipped."
     },
     "S": {
      "title": "ATTEMPT STOPPED",
      "text": "You call the contact on file. The real vendor answers, never asked for a change, and the old account stays. You report the attempt, and the real Mark is warned that his voice is being cloned."
     }
    },
    "debrief": [
     "A cloned voice can sound exactly like a supplier you know. Writing “confirmed by phone” is the workaround that makes an unchecked change look checked, and the second approver can only approve what you wrote.\nThe signed form starts the process, and the callback to the contact already on file is what makes it a control. Never call a number the request gave you.",
     "Sources: FBI IC3 PSA I-120324-PSA; Canadian Centre for Cyber Security"
    ]
   },
   {
    "type": "Video call",
    "title": "THE VIDEO CALL",
    "setup": "A video call from the vendor’s finance director, with two colleagues. Her face and voice look right. She asks you to confirm new remittance details before the payment run closes at 3 pm. You try the contact in your master file, and it rings out. Your process: payments to changed details need an approved vendor change.",
    "options": [
     {
      "title": "Pay the new details this run, and ask her to confirm in writing afterwards.",
      "body": "",
      "kind": "F"
     },
     {
      "title": "Pay the details already on file for this run, and tell your AP manager about the call.",
      "body": "",
      "kind": "S"
     },
     {
      "title": "Hold the payment until the vendor answers, and don't mention the call to anyone.",
      "body": "",
      "kind": "P"
     }
    ],
    "outcomes": {
     "F": {
      "title": "PAYMENT SENT: FRAUD SUCCEEDED",
      "text": "The payment goes to the new account and is gone before the confirmation “arrives”. Everyone on the video was a deepfake, built from public footage of the vendor's team. “Pay now, paperwork later” moved the money first and the checks second."
     },
     "S": {
      "title": "ATTEMPT STOPPED",
      "text": "The payment goes to the genuine account on file, on time. Your manager reaches the real vendor later and learns nobody asked for a change. The attempt is reported, and the vendor is warned about the fake call."
     },
     "P": {
      "title": "PARTLY RIGHT",
      "text": "The payment is safe, but it misses the run and a late fee may apply. Nobody else in Accounts Payable has been warned, so the same caller can try the next clerk. Being cautious alone is not enough: report it."
     }
    },
    "debrief": [
     "A video call with several familiar faces can still be fake. Seeing more than one person adds social proof, and a deadline makes you fix the problem on their terms.\nWhen you cannot verify in time, the safe default is the details already on file. Then tell your manager, so the next clerk is not caught.",
     "Sources: FBI IC3 PSA I-120324-PSA; CNN Business (Arup, 2024)"
    ]
   }
  ],
  "ex": [
   {
    "type": "Phone call",
    "title": "THE URGENT DEAL",
    "setup": "The Chair calls: a deal closes in an hour, and a USD 480,000 payment must go today. She says the usual callback and second approver will take too long, and tells you to authorise it yourself. Your process: payments over USD 100,000 need two approvers in the bank portal.",
    "options": [
     {
      "title": "Release it with your token, and ask the second approver to sign it off by phone.",
      "body": "",
      "kind": "F"
     },
     {
      "title": "Keep the two approvers, and ask treasury to fast-track the payment within the hour.",
      "body": "",
      "kind": "S"
     },
     {
      "title": "Ask the CFO to take over, and let her decide whether it goes ahead.",
      "body": "",
      "kind": "P"
     }
    ],
    "outcomes": {
     "S": {
      "title": "ATTEMPT STOPPED",
      "text": "Treasury fast-tracks the two approvals, and during the checks the Chair's office says she never called. Nothing is released, and a real deal would still close in time. Urgency changes how fast you work through the controls, not whether you do."
     },
     "F": {
      "title": "PAYMENT SENT: FRAUD SUCCEEDED",
      "text": "The second approver, hearing it came from the Chair, signs it off, and the payment goes out. The call was a deepfake of the Chair, built from her public interviews. Two signatures on one unverified request are one check, not two."
     },
     "P": {
      "title": "PARTLY RIGHT",
      "text": "You avoid deciding alone, which is good. But the CFO now decides on an unverified instruction, and the pressure has simply moved to her. Until someone checks with the Chair's office, nothing has been verified."
     }
    },
    "debrief": [
     "Attackers target the moment when a control feels like an obstacle. A one-hour deadline and the Chair's authority are the levers, and a second approver signing by phone does not add a second check.\nKeeping both approvers and asking treasury to fast-track protects the payment and the deal. If the request is real, it survives a few minutes of checking."
    ]
   },
   {
    "type": "Video call",
    "title": "THE BOARD VIDEO CALL",
    "setup": "A video call from the board: the Chair and two directors ask you to approve a USD 480,000 payment for a confidential acquisition today, with no time for the usual checks. Your process: acquisition payments need a board resolution, recorded by the company secretary.",
    "options": [
     {
      "title": "Ask the company secretary to confirm there is a board resolution for the payment.",
      "body": "",
      "kind": "S"
     },
     {
      "title": "Ask the CFO to join the call, and approve it if she agrees.",
      "body": "",
      "kind": "P"
     },
     {
      "title": "Approve it now, and ask the company secretary to record the resolution afterwards.",
      "body": "",
      "kind": "F"
     }
    ],
    "outcomes": {
     "F": {
      "title": "PAYMENT SENT: FRAUD SUCCEEDED",
      "text": "The payment goes out and cannot be recalled in time. Everyone on the call was a deepfake, built from public footage and interviews. Recording the resolution afterwards would only have documented a decision nobody made."
     },
     "P": {
      "title": "PARTLY RIGHT",
      "text": "You avoid deciding alone, but the CFO joins the same call, hears the same story and sees the same faces. If everyone on the screen is fake, her agreement proves nothing. The resolution register would have settled it."
     },
     "S": {
      "title": "ATTEMPT STOPPED",
      "text": "The company secretary has no resolution on record and no meeting scheduled. The real Chair and directors were never on the call. Nothing is approved, and the attempt goes to Security and the board."
     }
    },
    "debrief": [
     "Several senior faces agreeing on a call feels safe, but a deepfake can create all of them, and “record it afterwards” is the workaround that makes a decision look made.\nA payment this size needs a board resolution, and the company secretary holds the register. One question settles it, and a real board will not mind you asking.",
     "Sources: FBI IC3 PSA I-120324-PSA; CNN Business (Arup, 2024)"
    ]
   }
  ],
  "it": [
   {
    "type": "Phone call",
    "title": "THE URGENT RESET",
    "setup": "The voice on the phone sounds exactly like your IT Director. “Hi, it's me. I'm locked out of my account and I've got a board presentation in twenty minutes. Can you reset my MFA right now? I've already opened a ticket from my phone, so you can just approve it, and I'll sort the paperwork after. Please, this can't wait.” Your process: MFA resets need identity verification and manager approval in the ticket.",
    "options": [
     {
      "title": "Send the ticket to her manager for approval, and reset the MFA once they approve.",
      "body": "",
      "kind": "S"
     },
     {
      "title": "Tell her you can't reset it by phone, and ask her to visit the service desk.",
      "body": "",
      "kind": "P"
     },
     {
      "title": "Reset it now, and add a note to the ticket that it was an urgent exception.",
      "body": "",
      "kind": "F"
     }
    ],
    "outcomes": {
     "F": {
      "title": "ACCESS GRANTED: FRAUD SUCCEEDED",
      "text": "The reset goes through, and the caller registers a new MFA device within minutes. The real IT Director never called; her voice was cloned from a recorded conference talk still online. A note on the ticket records the exception, but it does not make it approved."
     },
     "S": {
      "title": "ATTEMPT STOPPED",
      "text": "Her manager replies within minutes: she never asked for a reset, and she is in back-to-back meetings. The ticket was raised from a new device in another country. You do not reset the MFA, the ticket is flagged, and you report it to Security."
     },
     "P": {
      "title": "PARTLY RIGHT",
      "text": "Nobody is locked out by mistake and the MFA is not reset, so the attack fails here. But the caller is sent away unchecked, the real director may miss her presentation, and Security never hears about the call. The same caller can try another engineer."
     }
    },
    "debrief": [
     "A ticket, a familiar voice and a deadline are three levers at once, and any of them can be faked: the ticket was raised from a compromised account, and the voice was cloned. “Urgent exception” is the note that makes a skipped check look planned.\nAn MFA reset is a change of identity. Route it through the manager approval in the ticket, because only the real manager can approve it from their own account.",
     "Sources: CISA and FBI AA23-320A (help-desk MFA resets); FBI IC3 PSA I-120324-PSA"
    ]
   },
   {
    "type": "Video call",
    "title": "THE EMERGENCY ACCESS",
    "setup": "A video call from your CISO, live on camera, approving an emergency access exception. “Hey, sorry to jump on camera for this. I need you to grant emergency access to the finance server for an external consultant right now. We're mid-incident and can't wait for the emergency process. I'll take responsibility for this, just get it done quickly.” Your process: emergency access goes through break-glass, approved by the on-call security manager.",
    "options": [
     {
      "title": "Add the consultant to the finance server group, and raise the change record after the incident.",
      "body": "",
      "kind": "F"
     },
     {
      "title": "Ask him to post the request in the incident channel, then grant the access.",
      "body": "",
      "kind": "P"
     },
     {
      "title": "Ask the on-call security manager to approve the access through the break-glass procedure.",
      "body": "",
      "kind": "S"
     }
    ],
    "outcomes": {
     "F": {
      "title": "ACCESS GRANTED: FRAUD SUCCEEDED",
      "text": "The consultant account has full access within minutes. The real CISO was in a different meeting the entire time, and the video was a real-time deepfake built from his public conference appearances. Raising the change record afterwards documented the breach, but did not prevent it."
     },
     "S": {
      "title": "ATTEMPT STOPPED",
      "text": "The on-call security manager has no emergency on record, and the real CISO is reached in a different meeting. The break-glass procedure needs a pass-phrase and an approval the caller cannot provide. Access is not granted, and Security Operations is told."
     },
     "P": {
      "title": "PARTLY RIGHT",
      "text": "You asked for a trail, which is the right instinct. But a message in a channel is not approval, and an attacker with a stolen account can post it too. Nobody with authority has approved the access, and nobody has been told."
     }
    },
    "debrief": [
     "A real-time deepfake of a senior leader, urgency and “I'll take responsibility” are designed to make an emergency feel like an exception to the rules. Raising the change record later is the workaround that makes a breach look like paperwork.\nEmergencies have their own procedure: break-glass, approved by the on-call security manager. It exists so that a fast decision is still a verified one.",
     "Source: FBI IC3 PSA I-120324-PSA"
    ]
   }
  ]
 },
 "phases": {
  "detect": {
   "label": "1  Detect",
   "title": "Detect",
   "blurb": "Spot the attempt before it costs anything.",
   "width": "33%",
   "items": [
    "Two email red-flag rounds. After each reveal, the psychological levers that were pulled are named, drawn from Cialdini's six principles of persuasion.",
    "The same levers in other channels: text messages, QR codes and phone calls.",
    "ClickFix: how a fake security check gives an attacker a real mailbox.",
    "Role-specific learning slides, such as AI-written emails, cloned voices and deepfakes."
   ]
  },
  "verify": {
   "label": "2  Verify",
   "title": "Verify",
   "blurb": "Check the request somewhere the attacker cannot reach.",
   "width": "66%",
   "items": [
    "One habit, taught in role: verify somewhere the request can't reach.",
    "Role-specific controls: callbacks, second approvers, strong authentication and break-glass procedures.",
    "Two decision scenarios built on AI: a cloned voice and a deepfake video call. Each choice has a consequence and a debrief."
   ]
  },
  "contain": {
   "label": "3  Contain",
   "title": "Contain",
   "blurb": "Act in the right order when something has gone wrong.",
   "width": "100%",
   "items": [
    "One decision flow: has money or data already moved? The order of action follows the answer.",
    "Who to call and report to, with national services for Australia, the United States, the United Kingdom and Canada, and IDCARE for identity support.",
    "Privacy and legal duties, such as the EU's GDPR and Australia's Notifiable Data Breaches scheme.",
    "Two knowledge-check questions with feedback."
   ]
  }
 }
};
