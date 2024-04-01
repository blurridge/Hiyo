# Hiyo - An Attendance Tracker App 🎖️

![Hiyo Logo](https://i.imgur.com/2PlmHtt.png)
![Commit Shield](https://img.shields.io/github/last-commit/blurridge/Hiyo?style=for-the-badge)
![License](https://img.shields.io/github/license/blurridge/Hiyo?style=for-the-badge)

## Context

For my final project in the CPE 3222 Web Development course at the University of San Carlos, I developed an Hiyo, an attendance tracker app, aimed at enhancing contact tracing efforts within the Department of Computer Engineering. While the application was fully developed and functional, the scenario it addressed—streamlining contact tracing within the department—was theoretical, crafted to mimic real-world challenges amidst global health concerns.

The motivation behind this project stemmed from a hypothetical need to improve health and safety protocols in educational institutions through technology. Traditional manual contact tracing methods are fraught with inefficiencies, such as time consumption and data inaccuracies, which can hinder the effectiveness of health protocols. This project sought to tackle these issues by providing a digital solution that automates the process of tracking entries and exits, thereby enhancing safety measures with accuracy and efficiency.

The app integrates Next.js, PHP, and MySQL to offer a comprehensive system that facilitates user registration, check-in/check-out tracking, and administrative oversight. This combination of technologies was chosen to model a real-world application, demonstrating how modern web development tools can be utilized to solve practical problems.

Developing this app was not just about fulfilling a course requirement; it was an opportunity to apply theoretical knowledge in a practical setting, bridging the gap between academic learning and real-world application. It provided a hands-on experience in tackling a relevant issue with technology, underscoring the importance of web development skills in creating impactful solutions. Through this project, I gained invaluable insights into the full-stack development process.

## Tech Stack

**Client:**

<p> <a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" alt="next.js" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> </p>

**Server:**

<p><a href="https://www.php.net" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" alt="php" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a>  </p>

## Run Locally

Clone the project

```bash
  git clone https://github.com/blurridge/Hiyo
```

Go to the project's client directory

```bash
  cd Hiyo/client
```

Install dependencies

```bash
  npm install
```

Create a `.env` file containing your MySQL variables. Use `.env.example` as a template.
```
DB_SERVER   = <<your mysql server host here>>
DB_NAME     = <<your mysql db name here>>
DB_USER     = <<your mysql username here>>
DB_PASS     = <<your mysql password here>>
```

Start the server

```bash
  npm run dev
```

Start the PHP server

```bash
  cd Hiyo/
  php -S localhost:8080
```

Login to the MySQL server and run the .sql file

```bash
source Hiyo/api/users.sql
```

## Stay in touch

If you have any questions, suggestions, need further assistance, or would like to avail of Accred for your organization, feel free to reach out to me. I'm always happy to help!

- Email: [zachriane01@gmail.com](mailto:zachriane01@gmail.com)
- GitHub: [@blurridge](https://github.com/blurridge)
- Twitter: [@zachahalol](https://twitter.com/zachahalol)
- Instagram: [@zachahalol](https://www.instagram.com/zachahalol)
- LinkedIn: [Zach Riane Machacon](https://www.linkedin.com/in/zachriane)

## Contributors
<a href="https://github.com/blurridge/Hiyo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=blurridge/Hiyo" />
</a>