export const trails = [
  {
    id: "learn/front-end",
    label: "Front-End",
    completed: 0,
    totalExp: 1000,
    description:
      "Aprenda a construir interfaces modernas e responsivas, utilizando tecnologias avançadas para desenvolvimento web.",
    tags: ["HTML", "CSS", "JavaScript", "Frameworks"],
    icon: "/assets/front-end.svg",
    color: "#E44D26",
  },
  {
    id: "learn/back-end",
    label: "Back-End",
    completed: 0,
    totalExp: 1000,
    description:
      "Domine a criação de APIs escaláveis, bancos de dados e a lógica do servidor para aplicações robustas",
    tags: ["APIs Rest", "Prisma", "SQL"],
    icon: "/assets/backend.svg",
    color: "#983acc",
  },
  {
    id: "learn/devops",
    label: "DevOps",
    completed: 0,
    totalExp: 1000,
    description:
      "Explore técnicas de infraestrutura, CI/CD, containers e monitoramento para garantir a estabilidade dos sistemas",
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    icon: "/assets/devops.svg",
    color: "#F7ED23",
  },
  {
    id: "learn/data-structure",
    label: "Estruturas de Dados",
    completed: 0,
    totalExp: 1000,
    description:
      "Aprofunde-se em estruturas de dados, algoritmos e paradigmas para otimizar seu código",
    tags: ["Recursão", "Grafos", "Programação Dinâmica", "Complexidade"],
    icon: "/assets/structure.svg",
    color: "#7CCC3A",
  },
  {
    id: "learn/cybersecurity",
    label: "Cybersegurança",
    completed: 0,
    totalExp: 1000,
    description:
      "Criptografia, firewall, controle de acesso, hacking ético e como aplicar práticas de segurança em código e infraestruturas.",
    tags: ["Hacking Ético", "Firewalls", "Segurança em APIs"],
    icon: "/assets/security.svg",
    color: "#CC3A3A",
  },
  {
    id: "learn/database",
    label: "Banco de Dados",
    completed: 0,
    totalExp: 1000,
    description:
      "Design, otimização e manutenção de bancos de dados relacionais e NoSQL. Explore SQL, MongoDB, PostgreSQL e outras tecnologias essenciais para a gestão de dados.",
    tags: ["SQL", "NoSQL", "MongoDB", "PostgreSQL", "MySQL", "Modelagem"],
    icon: "/assets/database.svg",
    color: "#CCC03A",
  },
  {
    id: "learn/ai",
    label: "Inteligência Artificial",
    completed: 0,
    totalExp: 1000,
    description:
      "Explore os fundamentos de IA e Machine Learning, desde modelos básicos até técnicas avançadas, como redes neurais e deep learning",
    tags: ["Machine Learning", "TensorFlow", "Data Science", "Python"],
    icon: "/assets/ai.svg",
    color: "#3ACC88",
  },
  {
    id: "learn/cloud-computing",
    label: "Cloud Computing",
    completed: 0,
    totalExp: 1000,
    description:
      "Plataformas de nuvem como AWS, Google Cloud e Azure, abordando a criação e gerenciamento de ambientes na nuvem, escalabilidade e arquitetura de soluções de alta disponibilidade",
    tags: ["AWS", "Google Cloud", "Azure", "Escalabilidade"],
    icon: "/assets/cloud.svg",
    color: "#3AA1CC",
  },
  {
    id: "learn/tests",
    label: "Testes e Qualidade de Software",
    completed: 0,
    totalExp: 1000,
    description:
      "Criação de testes automatizados e na garantia de qualidade do software",
    tags: ["Testes Unitários", "Jest", "Cypress", "Selenium", "TDD"],
    icon: "/assets/tests.svg",
    color: "#3ACC53",
  },
  {
    id: "learn/ui-ux",
    label: "UX/UI Design",
    completed: 0,
    totalExp: 1000,
    description:
      "Interfaces de usuário intuitivas e agradáveis, com foco em design centrado no usuário",
    tags: ["Figma", "Adobe XD", "UX Design", "UI Design", "Prototipagem"],
    icon: "/assets/uiux.svg",
    color: "#A259FF",
  },
  {
    id: "learn/mobile-development",
    label: "Mobile Development",
    completed: 0,
    totalExp: 1000,
    description:
      "Mergulhe no desenvolvimento de aplicativos móveis usando React Native, Flutter ou outras tecnologias para criar apps nativos para Android e iOS",
    tags: ["React Native", "Flutter", "Android", "iOS"],
    icon: "/assets/mobile.svg",
    color: "#C23ACC",
  },
];

// Trilha Front-End
export const modules = [
  {
    module: "Fundamentos do Desenvolvimento Web",
    totalXp: 600,
    topics: [
      {
        topic: "Introdução ao HTML",
        totalXp: 100,
      },
      {
        topic: "Tags e Estruturação Semântica",
        totalXp: 100,
      },
      {
        topic: "Fundamentos do CSS",
        totalXp: 100,
      },
      {
        topic: "Unidades de Medida e Box Model",
        totalXp: 100,
      },
      {
        topic: "Introdução ao JavaScript",
        totalXp: 100,
      },
      {
        topic: "Manipulação do DOM",
        totalXp: 100,
      },
    ],
  },
  {
    module: "Estilização Avançada",
    totalXp: 800,
    topics: [
      {
        topic: "Flexbox: Layouts Dinâmicos",
        totalXp: 100,
      },
      {
        topic: "Grid Layout: Estruturando Páginas",
        totalXp: 100,
      },
      {
        topic: "Animações e Transições com CSS",
        totalXp: 100,
      },
      {
        topic: "CSS Responsivo com Media Queries",
        totalXp: 100,
      },
      {
        topic: "Pré-processadores CSS (SASS/LESS)",
        totalXp: 100,
      },
      {
        topic: "Tailwind CSS: Estilização Moderna",
        totalXp: 100,
      },
      {
        topic: "Dark Mode e Temas Dinâmicos",
        totalXp: 100,
      },
      {
        topic: "Boas Práticas de CSS e Arquitetura BEM",
        totalXp: 100,
      },
    ],
  },
  {
    module: "JavaScript Moderno",
    totalXp: 800,
    topics: [
      {
        topic: "Variáveis e Escopo no JavaScript",
        totalXp: 100,
      },
      {
        topic: "Funções e Arrow Functions",
        totalXp: 100,
      },
      {
        topic: "Destructuring e Operador Spread",
        totalXp: 100,
      },
      {
        topic: "Promises e Async/Await",
        totalXp: 100,
      },
      {
        topic: "Manipulação de Arrays e Objetos",
        totalXp: 100,
      },
      {
        topic: "Eventos e Delegação de Eventos",
        totalXp: 100,
      },
      {
        topic: "Módulos e Importação/Exportação",
        totalXp: 100,
      },
      {
        topic: "Depuração e Console do Navegador",
        totalXp: 100,
      },
    ],
  },
];
