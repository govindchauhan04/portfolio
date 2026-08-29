import { useState } from 'react'
import { FiBookOpen, FiCheckCircle, FiCode } from 'react-icons/fi'

const lessons = [
  {
    id: 'html', name: 'HTML', accent: 'text-orange-300', level: 'Beginner',
    description: 'HTML gives every web page its structure and meaning. Learn semantic elements before styling or scripting.',
    essentials: ['Document structure: <!doctype html>, html, head and body', 'Semantic content: header, nav, main, article, section and footer', 'Forms: label, input, button, validation attributes and accessible names', 'Media and links: img alt text, a href and responsive images', 'Tables and lists: use them for data and ordered content', 'Accessibility: heading order, landmarks and meaningful alt text'],
    example: '<main>\n  <article>\n    <h1>My first page</h1>\n    <p>Semantic HTML is accessible by default.</p>\n    <a href="/projects">See projects</a>\n  </article>\n</main>',
    practice: 'Build a profile page with a header, navigation, a project article and a contact form.',
    tools: 'VS Code, browser DevTools, HTML Validator', project: 'Build a multi-page personal portfolio with semantic sections and a contact form.',
  },
  {
    id: 'css', name: 'CSS', accent: 'text-sky-300', level: 'Beginner',
    description: 'CSS controls presentation: layout, spacing, type, colour and responsive behaviour.',
    essentials: ['Selectors, inheritance, specificity and the cascade', 'Box model: content, padding, border, margin and box-sizing', 'Flexbox for one-dimensional layouts and Grid for two-dimensional layouts', 'Responsive design with media queries, relative units and mobile-first rules', 'Typography, colour systems, CSS variables and reusable utility classes', 'Transitions, transforms and accessible motion preferences'],
    example: '.card {\n  display: grid;\n  gap: 1rem;\n  padding: 1.25rem;\n  border-radius: 1rem;\n  background: #101827;\n}\n\n@media (min-width: 768px) {\n  .card { grid-template-columns: 1fr 1fr; }\n}',
    practice: 'Recreate a responsive card grid that changes from one to three columns.',
    tools: 'Browser DevTools, CSS Grid Generator, Tailwind CSS', project: 'Design a responsive landing page with a dark/light theme toggle and animated cards.',
  },
  {
    id: 'javascript', name: 'JavaScript', accent: 'text-yellow-200', level: 'Beginner → Intermediate',
    description: 'JavaScript adds behaviour to web pages and is also used for servers with Node.js.',
    essentials: ['Values, variables, operators, conditionals and loops', 'Functions, scope, arrays, objects and array methods', 'DOM events: querySelector, addEventListener and form handling', 'Asynchronous code with promises, async/await and fetch', 'ES modules, JSON, localStorage and error handling', 'Debugging with console tools, breakpoints and network inspection'],
    example: 'async function loadProjects() {\n  const response = await fetch("/api/projects");\n  if (!response.ok) throw new Error("Could not load projects");\n  const projects = await response.json();\n  return projects.filter((project) => project.featured);\n}',
    practice: 'Create a search box that filters a list of projects while the user types.',
    tools: 'Node.js, npm, Vite, Chrome DevTools', project: 'Build a weather or movie-search app with loading, empty and error states.',
  },
  {
    id: 'python', name: 'Python', accent: 'text-blue-300', level: 'Beginner → Intermediate',
    description: 'Python is readable, versatile and ideal for programming fundamentals, automation, APIs and data work.',
    essentials: ['Variables, strings, lists, dictionaries, loops and functions', 'Comprehensions, modules, virtual environments and packages', 'Exceptions, files and type hints for maintainable code', 'Classes, HTTP requests and building APIs with FastAPI', 'Testing with pytest and code quality with formatters/linters', 'Data analysis basics with NumPy, Pandas and Matplotlib'],
    example: 'def word_counts(text: str) -> dict[str, int]:\n    counts: dict[str, int] = {}\n    for word in text.lower().split():\n        counts[word] = counts.get(word, 0) + 1\n    return counts\n\nprint(word_counts("code learn code"))',
    practice: 'Write a command-line expense tracker that saves entries to a JSON file.',
    tools: 'Python, pip, venv, pytest, FastAPI', project: 'Create a REST API for a task tracker with validation and persistent storage.',
  },
  {
    id: 'java', name: 'Java', accent: 'text-red-300', level: 'Intermediate',
    description: 'Java is a strongly typed, object-oriented language used for DSA, Android and enterprise applications.',
    essentials: ['Classes, objects, constructors, methods and access modifiers', 'Primitive types, arrays, ArrayList, HashMap and generics', 'Inheritance, interfaces, polymorphism and exceptions', 'Collections, streams and time-complexity-aware problem solving', 'JVM basics, packages and organising a multi-class program', 'Unit testing with JUnit and building with Maven or Gradle'],
    example: 'import java.util.*;\n\nclass Main {\n  static int firstDuplicate(int[] nums) {\n    Set<Integer> seen = new HashSet<>();\n    for (int value : nums) if (!seen.add(value)) return value;\n    return -1;\n  }\n\n  public static void main(String[] args) {\n    System.out.println(firstDuplicate(new int[] {2, 1, 3, 1}));\n  }\n}',
    practice: 'Implement a Student class and store students in an ArrayList with search by ID.',
    tools: 'JDK, IntelliJ IDEA or VS Code, JUnit, Maven', project: 'Build a console-based library manager with search, issue and return features.',
  },
  {
    id: 'c', name: 'C', accent: 'text-slate-200', level: 'Intermediate',
    description: 'C teaches how programs use memory. It is foundational for systems programming and DSA.',
    essentials: ['Data types, control flow, functions and header files', 'Arrays, strings and pointers', 'Memory allocation with malloc/free and avoiding leaks', 'Structs, files and debugging with compiler warnings', 'Pointer arithmetic, command-line arguments and function pointers', 'Compile with warnings enabled and use a debugger to trace faults'],
    example: '#include <stdio.h>\n\nint sum(const int values[], int length) {\n  int total = 0;\n  for (int i = 0; i < length; i++) total += values[i];\n  return total;\n}\n\nint main(void) {\n  int values[] = {2, 4, 6};\n  printf("%d\\n", sum(values, 3));\n  return 0;\n}',
    practice: 'Create a dynamic integer array using malloc, realloc and free.',
    tools: 'GCC or Clang, GDB, Make, Valgrind', project: 'Create a contact-book CLI using structs, files and dynamic memory safely.',
  },
  {
    id: 'cpp', name: 'C++', accent: 'text-violet-300', level: 'Intermediate',
    description: 'C++ combines low-level control with modern abstractions and a powerful standard library.',
    essentials: ['References, const correctness, functions and classes', 'STL containers: vector, map, unordered_map, stack and queue', 'Algorithms, iterators and lambda functions', 'RAII, smart pointers and value semantics', 'Templates, operator overloading and modern C++ language features', 'Move semantics, testing and sanitizers for safer programs'],
    example: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> values {5, 2, 8, 1};\n  std::sort(values.begin(), values.end());\n  for (int value : values) std::cout << value << " ";\n}',
    practice: 'Solve Two Sum using vector and unordered_map, then analyse time and space complexity.',
    tools: 'G++ or Clang++, CMake, GDB, sanitizers', project: 'Build a command-line student-record manager using classes and STL containers.',
  },
]

export default function LearningNotes() {
  const [activeId, setActiveId] = useState('html')
  const lesson = lessons.find((item) => item.id === activeId) ?? lessons[0]

  return (
    <section id="learning-notes" className="relative scroll-mt-28 px-4 py-24 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Learning notes</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">Learn a language, one solid foundation at a time.</h2>
        <p className="mt-3 max-w-3xl text-white/60">Choose a language for the core ideas, a working example, and a practical exercise. Start with HTML, CSS and JavaScript for web development, or Python for programming fundamentals.</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-[15rem_1fr]">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
            {lessons.map((item) => (
              <button key={item.id} onClick={() => setActiveId(item.id)} className={`rounded-xl border px-4 py-3 text-left text-sm transition ${activeId === item.id ? 'border-cyan-300/50 bg-cyan-300/10 text-cyan-100' : 'border-white/10 bg-panel/60 text-white/65 hover:border-white/25 hover:bg-white/5'}`}>
                <span className="block font-medium">{item.name}</span>
                <span className="mt-1 block text-xs text-white/40">{item.level}</span>
              </button>
            ))}
          </div>

          <article className="rounded-2xl border border-white/10 bg-panel/80 p-5 shadow-glow sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><p className={`font-mono text-xs uppercase tracking-[0.16em] ${lesson.accent}`}>{lesson.level}</p><h3 className="mt-2 font-display text-3xl text-white">{lesson.name}</h3></div><FiBookOpen className="text-2xl text-cyan-300" /></div>
            <p className="mt-4 leading-7 text-white/65">{lesson.description}</p>

            <div className="mt-7 grid gap-6 xl:grid-cols-[1fr_1.05fr]">
              <div><h4 className="flex items-center gap-2 font-medium text-white"><FiCheckCircle className="text-cyan-300" />What to learn</h4><ul className="mt-3 space-y-3">{lesson.essentials.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/65"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />{item}</li>)}</ul><div className="mt-6 rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-4"><p className="font-mono text-xs uppercase tracking-wider text-cyan-200">Practice next</p><p className="mt-2 text-sm leading-6 text-white/70">{lesson.practice}</p><p className="mt-4 font-mono text-xs uppercase tracking-wider text-cyan-200">Recommended tools</p><p className="mt-1 text-sm leading-6 text-white/60">{lesson.tools}</p><p className="mt-4 font-mono text-xs uppercase tracking-wider text-cyan-200">Portfolio project</p><p className="mt-1 text-sm leading-6 text-white/60">{lesson.project}</p></div></div>
              <div><h4 className="flex items-center gap-2 font-medium text-white"><FiCode className="text-cyan-300" />Example</h4><pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-[#060a13] p-4 font-mono text-sm leading-6 text-cyan-50"><code>{lesson.example}</code></pre><a href="#dsa-lab" className="mt-4 inline-flex rounded-lg border border-cyan-300/30 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-300/10">Practice in DSA Lab →</a></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
