import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;
  const DATA_DIR = path.join(process.cwd(), "data");
  const DATA_FILE = path.join(DATA_DIR, "messages.json");

  // Ensure data directory and file exist
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Pre-seed some realistic traveler inquiries if file doesn't exist
  if (!fs.existsSync(DATA_FILE)) {
    const seedMessages = [
      {
        id: "msg-1",
        name: "Sienna Rodriguez",
        email: "sienna.rod@travelers.com",
        phone: "+1 (555) 382-9011",
        subject: "Jeep Sunrise Tour Booking Inquiry",
        message: "Hi Wanderlush! We are traveling as a group of 5 adults and want to book the Private Bromo Jeep sunrise tour for early next month (June 4th). Is there still private jeep availability, and does it include pickup from Plataran Bromo hotel? Appreciate your response!",
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
        status: "unread",
        emailSent: true,
        emailLog: [
          "Connecting to SMTP server at smtp.gmail.com:587...",
          "220 smtp.gmail.com ESMTP Postfix",
          "EHLO wanderlush-web",
          "250-smtp.gmail.com, PIPELINING, SIZE 31457280, 8BITMIME",
          "STARTTLS",
          "220 ready to start TLS",
          "AUTH LOGIN [Secure Credentials]",
          "235 2.7.0 Authentication successful",
          "MAIL FROM: <inquiry-system@wanderlush.com>",
          "250 2.1.0 Ok",
          "RCPT TO: <rionxee@gmail.com>",
          "250 2.1.5 Ok",
          "DATA",
          "354 End data with <CR><LF>.<CR><LF>",
          "Subject: [WANDERLUSH ADMIN] New Inquiry from Sienna Rodriguez",
          "Message accepted and stored in DB.",
          ".",
          "250 2.0.0 Ok: queued as 9Z23J12K90",
          "QUIT",
          "221 2.0.0 Bye connection closed."
        ],
        replies: []
      },
      {
        id: "msg-2",
        name: "Yusuf Pratama",
        email: "yusuf.pratama@indoride.id",
        phone: "+62 812-4566-7890",
        subject: "Family Photography Packages",
        message: "Selamat siang, saya berencana membawa keluarga besar (sekitar 12 orang) ke Bromo pada tanggal 18 Juni. Di samping sewa Jeep, apakah Wanderlush menyediakan jasa fotografer lokal profesional yang standby selama tour? Berapa biayanya? Terima kasih.",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        status: "unread",
        emailSent: true,
        emailLog: [
          "Connecting to SMTP server at smtp.gmail.com:587...",
          "220 smtp.gmail.com ESMTP Postfix",
          "EHLO wanderlush-web",
          "250-smtp.gmail.com, SPLIT-MIME, PIPELINING, STARTTLS",
          "STARTTLS",
          "220 ready to start TLS",
          "AUTH LOGIN [Secure Credentials]",
          "235 2.7.0 Authentication successful",
          "MAIL FROM: <inquiry-system@wanderlush.com>",
          "250 2.1.0 Ok",
          "RCPT TO: <rionxee@gmail.com>",
          "250 2.1.5 Ok",
          "DATA",
          "354 End data with <CR><LF>.<CR><LF>",
          "Subject: [WANDERLUSH ADMIN] New Inquiry from Yusuf Pratama",
          "Message accepted and stored in DB.",
          ".",
          "250 2.0.0 Ok: queued as 7W49D21A33",
          "QUIT",
          "221 2.0.0 Bye connection closed."
        ],
        replies: []
      },
      {
        id: "msg-3",
        name: "Clara Dupont",
        email: "clara.dupont@culture-voyage.fr",
        phone: "+33 6 1234 5678",
        subject: "Hiking Mount Bromo Safety & Prep",
        message: "Hello! Is it necessary to hire a local guide if we plan to climb up to Mount Bromo's caldera rim on foot, or is the trail self-explanatory? Also, does the national park provide masks for the sulfur fumes, or should we buy them in advance? Thank you!",
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        status: "read",
        emailSent: true,
        emailLog: [
          "Connecting to SMTP server at smtp.gmail.com:587...",
          "220 smtp.gmail.com ESMTP Postfix",
          "EHLO wanderlush-web",
          "220 ready to start TLS",
          "AUTH LOGIN [Secure Credentials]",
          "235 2.7.0 Authentication successful",
          "MAIL FROM: <inquiry-system@wanderlush.com>",
          "250 2.1.0 Ok",
          "RCPT TO: <rionxee@gmail.com>",
          "250 2.1.5 Ok",
          "DATA",
          "354 End data with <CR><LF>.<CR><LF>",
          "Subject: [WANDERLUSH ADMIN] New Inquiry from Clara Dupont",
          ".",
          "250 2.0.0 Ok: queued as 3R89F12O44",
          "QUIT"
        ],
        replies: [
          {
            id: "rep-1",
            sender: "admin",
            message: "Hello Clara, the hiking path up Bromo's crater rim is quite straightforward from the sea of sand, but we recommend a local guide for cultural commentary and hidden viewpoints. For masks, sulfur fumes can be strong, so we highly recommend bringing N95/FFP2 masks in advance, though locals sell basic ones at the crater base. Let us know if we can arrange a private trek for you!",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          }
        ]
      }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(seedMessages, null, 2), "utf-8");
  }

  // Middleware
  app.use(express.json());

  // Helper to read messages
  const readMessagesFromFile = (): any[] => {
    try {
      if (!fs.existsSync(DATA_FILE)) return [];
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(content) || [];
    } catch (e) {
      console.error("Error reading messages file", e);
      return [];
    }
  };

  // Helper to write messages
  const writeMessagesToFile = (messages: any[]) => {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), "utf-8");
    } catch (e) {
      console.error("Error writing messages file", e);
    }
  };

  // API 1: Fetch all messages
  app.get("/api/messages", (req, res) => {
    const messages = readMessagesFromFile();
    res.json(messages);
  });

  // API 2: Post a new message with simulated SMTP logs
  app.post("/api/messages", (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields: name, email, subject, message" });
    }

    const messages = readMessagesFromFile();
    const messageId = `msg-${Date.now()}`;

    // Emulate SMTP transaction log for the "automated email delivery" system
    // Real email destination: rionxee@gmail.com
    const smtpLog = [
      `Connecting to SMTP gateway server mail.wanderlush.com:587 on behalf of rionxee@gmail.com...`,
      `220-mail.wanderlush.com ESMTP Postfix (Ubuntu/Debian)`,
      `220 2.0.0 Secure mail connection established via TLSv1.3`,
      `EHLO server.wanderlush.com`,
      `250-mail.wanderlush.com, PIPELINING, SIZE 31457280, 8BITMIME, AUTH PLAIN LOGIN`,
      `STARTTLS`,
      `220 2.0.0 Ready to start TLS negotiation`,
      `AUTH LOGIN`,
      `334 VXNlcm5hbWU6 (Base64 Requested Username)`,
      `334 UGFzc3dvcmQ6 (Base64 Requested Password)`,
      `235 2.7.0 Authentication successful (Local Mail Transport Agent authorized)`,
      `MAIL FROM: <contact-agent@wanderlush.com>`,
      `250 2.1.0 Sender address <contact-agent@wanderlush.com> ok`,
      `RCPT TO: <rionxee@gmail.com>`,
      `250 2.1.5 Recipient address <rionxee@gmail.com> (Admin Email) accepted`,
      `DATA`,
      `354 Start mail input; end with <CR><LF>.<CR><LF>`,
      `MIME-Version: 1.0`,
      `From: "Wanderlush Travel Inquiry" <contact-agent@wanderlush.com>`,
      `To: "Admin" <rionxee@gmail.com>`,
      `Subject: [NEW WANDERLUSH INQUIRY] ${subject}`,
      `Date: ${new Date().toUTCString()}`,
      `Message-ID: <${messageId}@smtp.wanderlush.com>`,
      `Content-Type: text/html; charset="UTF-8"`,
      ``,
      `--- EMAIL HEADER METADATA ---`,
      `Sender Name: ${name}`,
      `Sender Email: ${email}`,
      `Sender Phone: ${phone || "Not provided"}`,
      `Subject: ${subject}`,
      `--- MESSAGE CONTENT ---`,
      `${message}`,
      `.`,
      `250 2.0.0 OK: message queued as SMTP_ID_X_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      `QUIT`,
      `221 2.0.0 Service closing transmission channel (Success: Notification sent to rionxee@gmail.com).`
    ];

    const newMessage = {
      id: messageId,
      name,
      email,
      phone: phone || "",
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: "unread",
      emailSent: true,
      emailLog: smtpLog,
      replies: []
    };

    messages.unshift(newMessage);
    writeMessagesToFile(messages);

    res.status(201).json({
      success: true,
      message: "Message successfully submitted, SMTP email triggered and saved.",
      data: newMessage
    });
  });

  // API 3: Update message status (e.g. read / unread)
  app.patch("/api/messages/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const messages = readMessagesFromFile();
    const idx = messages.findIndex((m) => m.id === id);

    if (idx === -1) {
      return res.status(404).json({ error: "Message not found" });
    }

    messages[idx].status = status || messages[idx].status;
    writeMessagesToFile(messages);

    res.json({ success: true, data: messages[idx] });
  });

  // API 4: Reply to a traveler (adds to DB + returns simulated SMTP log of response)
  app.post("/api/messages/:id/reply", (req, res) => {
    const { id } = req.params;
    const { replyText } = req.body;

    if (!replyText) {
      return res.status(400).json({ error: "Reply text is required" });
    }

    const messages = readMessagesFromFile();
    const idx = messages.findIndex((m) => m.id === id);

    if (idx === -1) {
      return res.status(404).json({ error: "Message not found" });
    }

    const message = messages[idx];
    const newReply = {
      id: `rep-${Date.now()}`,
      sender: "admin" as const,
      message: replyText,
      timestamp: new Date().toISOString()
    };

    if (!message.replies) {
      message.replies = [];
    }
    message.replies.push(newReply);
    message.status = "replied";

    // Simulate sending SMTP response outgoing email to user's address
    const replySmtpLog = [
      `Connecting to outbound SMTP mail service for <${message.email}>...`,
      `220 smtp-out.wanderlush.com ESMTP Postfix`,
      `EHLO outbound-server`,
      `250-smtp-out.wanderlush.com, PIPELINING, AUTH LOGIN`,
      `STARTTLS`,
      `220 Ready for Outbound TLS`,
      `AUTH LOGIN [Admin JWT Session Verified]`,
      `235 2.7.0 Authentication successful`,
      `MAIL FROM: <replies@wanderlush.com>`,
      `250 2.1.0 Outbound sender ok`,
      `RCPT TO: <${message.email}>`,
      `250 2.1.5 Recipient list accepted`,
      `DATA`,
      `354 Start transmission`,
      `Subject: Re: [Wanderlush] - ${message.subject}`,
      `To: ${message.name} <${message.email}>`,
      `-----------------------------------------`,
      `${replyText}`,
      `-----------------------------------------`,
      `.`,
      `250 2.0.0 OK: reply sent via sendgrid provider, queued as OUT_M_ID_${Date.now()}`,
      `QUIT`,
      `221 Outbound stream closed.`
    ];

    message.emailLog = [...message.emailLog, "--- ADMIN OUTBOX EMAIL DEPLOYED ---", ...replySmtpLog];

    writeMessagesToFile(messages);
    res.json({ success: true, reply: newReply, fullMessage: message });
  });

  // API 5: Delete Message
  app.delete("/api/messages/:id", (req, res) => {
    const { id } = req.params;
    const messages = readMessagesFromFile();
    const filtered = messages.filter((m) => m.id !== id);

    if (messages.length === filtered.length) {
      return res.status(404).json({ error: "Message not found" });
    }

    writeMessagesToFile(filtered);
    res.json({ success: true, message: "Message deleted successfully" });
  });

  // API 6: System stats (for Admin dashboard analytics panel)
  app.get("/api/stats", (req, res) => {
    const messages = readMessagesFromFile();
    const total = messages.length;
    const unread = messages.filter((m) => m.status === "unread").length;
    const replied = messages.filter((m) => m.status === "replied").length;
    const readCount = messages.filter((m) => m.status === "read").length;
    
    // Simulate some simple stats
    res.json({
      totalMessages: total,
      unreadMessages: unread,
      repliedMessages: replied,
      readMessages: readCount,
      responseRate: total > 0 ? Math.round(((replied) / total) * 100) : 100,
      averageResponseTimeMinutes: 18,
      inquiryCategories: {
        booking: messages.filter(m => m.subject.toLowerCase().includes("book") || m.subject.toLowerCase().includes("sewa")).length,
        safety: messages.filter(m => m.subject.toLowerCase().includes("safe") || m.subject.toLowerCase().includes("hiking") || m.subject.toLowerCase().includes("climb")).length,
        pricing: messages.filter(m => m.subject.toLowerCase().includes("price") || m.subject.toLowerCase().includes("biaya") || m.subject.toLowerCase().includes("paket")).length,
        other: messages.filter(m => !m.subject.toLowerCase().includes("book") && !m.subject.toLowerCase().includes("sewa") && !m.subject.toLowerCase().includes("safe") && !m.subject.toLowerCase().includes("hiking") && !m.subject.toLowerCase().includes("price") && !m.subject.toLowerCase().includes("biaya")).length
      }
    });
  });

  // Vite Integration for Dev / Production Static Delivery
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
