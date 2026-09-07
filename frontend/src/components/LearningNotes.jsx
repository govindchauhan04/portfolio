import React, { useState } from 'react';
import { FaBookOpen, FaCheckCircle, FaCode, FaTools, FaLaptopCode } from 'react-icons/fa';

const lessons = [
  {
    id: 'html', name: 'HTML5', level: 'Beginner', accent: 'text-amber-400',
    description: 'HTML gives web pages their structure and meaning. Master semantic elements before styling or scripting.',
    essentials: [
      'Document structure: <!doctype html>, html, head, body',
      'Semantic tags: header, nav, main, article, section, footer',
      'Forms: label, input, button, validation & accessibility',
      'Media & links: responsive img alt text, a href targets',
      'Accessibility (a11y): heading hierarchy, ARIA roles & landmarks'
    ],
    example: `<main>
  <article>
    <h1>Govind Singh — Portfolio</h1>
    <p>Semantic HTML is accessible by default.</p>
    <a href="#projects">Explore Projects</a>
  </article>
</main>`,
    practice: 'Build a profile page with header, nav, project article, and contact form.',
    tools: 'VS Code, Browser DevTools, W3C Validator',
    project: 'Build a multi-page personal portfolio with semantic layout.'
  },
  {
    id: 'css', name: 'CSS3', level: 'Beginner → Intermediate', accent: 'text-cyan-400',
    description: 'CSS controls presentation: layout, spacing, typography, color, glassmorphism, and responsive behavior.',
    essentials: [
      'Selectors, specificity, inheritance, and the cascade',
      'Box model: content, padding, border, margin & box-sizing',
      'Flexbox for 1D layouts and CSS Grid for 2D layouts',
      'Responsive design: media queries, relative units, mobile-first',
      'Custom animations, keyframes, transitions, and backdrop-filter'
    ],
    example: `.cyber-card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(13, 17, 23, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 229, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
}`,
    practice: 'Recreate a responsive card grid changing from 1 to 3 columns.',
    tools: 'Browser DevTools, Tailwind CSS, Keyframe Generators',
    project: 'Design a responsive landing page with dark/light theme toggle.'
  },
  {
    id: 'javascript', name: 'JavaScript (ES6+)', level: 'Intermediate', accent: 'text-yellow-300',
    description: 'JavaScript adds dynamic behavior to web pages and powers event-driven backend servers with Node.js.',
    essentials: [
      'Values, variables, operators, conditionals, and loops',
      'Functions, closures, arrow syntax, array methods (.map, .filter)',
      'DOM manipulation, event listeners, and dynamic rendering',
      'Asynchronous JS: Promises, async/await, and Fetch API',
      'ES Modules, JSON serialization, and error handling boundaries'
    ],
    example: `async function loadProjects() {
  const response = await fetch('/api/projects');
  if (!response.ok) throw new Error('Could not load projects');
  const data = await response.json();
  return data.filter(project => project.featured);
}`,
    practice: 'Create an interactive search box filtering project items while typing.',
    tools: 'Node.js, Vite, Chrome DevTools, ES6+',
    project: 'Build a weather or movie search app with loading & error states.'
  },
  {
    id: 'python', name: 'Python', level: 'Intermediate', accent: 'text-blue-400',
    description: 'Python is versatile, clean, and ideal for DSA, automation, RESTful APIs (FastAPI), and AI microservices.',
    essentials: [
      'Variables, strings, lists, dicts, loops, and functions',
      'List comprehensions, modules, virtual environments (venv)',
      'Exceptions, file I/O, type hints, and Pydantic models',
      'Asynchronous APIs with FastAPI & HTTP request handling',
      'Testing with pytest and code formatting with Black/Ruff'
    ],
    example: `def word_counts(text: str) -> dict[str, int]:
    counts: dict[str, int] = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts

print(word_counts("code build debug repeat"))`,
    practice: 'Write a CLI expense tracker that saves records to JSON files.',
    tools: 'Python 3, pip, FastAPI, pytest',
    project: 'Create a REST API backend with validation and MongoDB storage.'
  },
  {
    id: 'java', name: 'Java', level: 'Advanced', accent: 'text-rose-400',
    description: 'Java is a strongly typed, object-oriented language foundational for Core CS, DSA, and scalable applications.',
    essentials: [
      'Classes, objects, constructors, encapsulation & SOLID principles',
      'Primitives, arrays, ArrayList, HashMap, HashSet, generics',
      'Inheritance, interfaces, abstract classes & polymorphism',
      'Collection framework, Stream API, & time/space complexity DSA',
      'Unit testing with JUnit, build automation with Maven/Gradle'
    ],
    example: `import java.util.*;

class Main {
    static int firstDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int val : nums) {
            if (!seen.add(val)) return val;
        }
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(firstDuplicate(new int[]{2, 1, 3, 1}));
    }
}`,
    practice: 'Implement a Student class and manage students in ArrayList with ID lookup.',
    tools: 'JDK 17+, VS Code, IntelliJ IDEA, Maven, JUnit',
    project: 'Build a console library management system with issue & return logic.'
  },
  {
    id: 'c', name: 'C', level: 'Intermediate', accent: 'text-slate-200',
    description: 'C teaches low-level memory management, pointers, and memory layout critical for systems programming.',
    essentials: [
      'Data types, control flow, functions, and header files',
      'Pointers, addresses (&), dereferencing (*), and pointer arithmetic',
      'Dynamic memory allocation: malloc, calloc, realloc, free',
      'Structs, union, typedef, and command-line arguments',
      'Memory leak detection and debugging runtime faults'
    ],
    example: `#include <stdio.h>

int sum(const int values[], int length) {
    int total = 0;
    for (int i = 0; i < length; i++) total += values[i];
    return total;
}

int main(void) {
    int nums[] = {2, 4, 6};
    printf("Total = %d\\n", sum(nums, 3));
    return 0;
}`,
    practice: 'Implement a dynamic integer array using malloc, realloc, and free.',
    tools: 'GCC, Clang, Make, Valgrind',
    project: 'Create a CLI contact book using structs and dynamic memory.'
  },
  {
    id: 'cpp', name: 'C++', level: 'Intermediate', accent: 'text-violet-400',
    description: 'C++ combines low-level memory control with high-level STL containers, templates, and OOP.',
    essentials: [
      'References, const correctness, constructors, & destructors',
      'STL containers: vector, map, unordered_map, stack, queue, priority_queue',
      'STL algorithms: std::sort, std::binary_search, iterators',
      'Smart pointers (std::unique_ptr, std::shared_ptr) & RAII',
      'Templates, lambda functions, and complexity analysis'
    ],
    example: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {5, 2, 8, 1};
    std::sort(nums.begin(), nums.end());
    for (int n : nums) std::cout << n << " ";
    return 0;
}`,
    practice: 'Solve Two Sum using std::unordered_map for O(N) time complexity.',
    tools: 'G++, Clang++, CMake, GDB',
    project: 'Build a student record CLI using classes and STL containers.'
  }
];

export default function LearningNotes() {
  const [activeId, setActiveId] = useState('html');
  const currentLesson = lessons.find((l) => l.id === activeId) || lessons[0];

  return (
    <section id="notes" className="py-24 relative overflow-hidden bg-[#0D1117]/60 border-t border-slate-800/80">
      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">04.5 // LANGUAGE ROADMAP</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-100 uppercase tracking-tight mb-4">
          LEARNING <span className="text-gradient-purple">NOTES</span>
        </h2>
        <p className="text-slate-400 text-sm font-sans mb-10 max-w-3xl">
          Master core programming languages with structured concepts, practical exercises, and code snippets.
        </p>

        {/* Tab Selection & Detailed Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Language Buttons */}
          <div className="lg:col-span-3 flex flex-wrap lg:flex-col gap-2 font-mono text-xs">
            {lessons.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                  activeId === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-100">{item.name}</span>
                  <span className={`text-[10px] ${item.accent}`}>{item.level}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Lesson Display Panel */}
          <div className="lg:col-span-9 glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,229,255,0.15)] font-sans">
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-2 mb-6">
              <div>
                <span className={`text-xs font-mono font-bold uppercase ${currentLesson.accent}`}>
                  {currentLesson.level} ROADMAP
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100">
                  {currentLesson.name}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                <FaBookOpen className="text-xl" />
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {currentLesson.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Essentials List */}
              <div className="space-y-4">
                <h4 className="font-heading font-bold text-cyan-400 text-sm flex items-center space-x-2">
                  <FaCheckCircle />
                  <span>Core Topics &amp; Fundamentals</span>
                </h4>
                <ul className="space-y-2 text-xs font-sans text-slate-300">
                  {currentLesson.essentials.map((point, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs font-mono">
                  <span className="text-violet-400 font-bold block uppercase">&gt; Practice Exercise</span>
                  <p className="text-slate-300 font-sans">{currentLesson.practice}</p>

                  <span className="text-cyan-400 font-bold block uppercase pt-2">&gt; Recommended Tools</span>
                  <p className="text-slate-400 font-sans">{currentLesson.tools}</p>
                </div>
              </div>

              {/* Code Example Block */}
              <div className="space-y-3 font-mono text-xs">
                <h4 className="font-heading font-bold text-amber-400 text-sm flex items-center space-x-2 font-sans">
                  <FaCode />
                  <span>Code Blueprint Example</span>
                </h4>
                <div className="bg-[#05070A] rounded-2xl p-4 border border-slate-800 overflow-x-auto text-slate-200 leading-relaxed shadow-inner">
                  <pre><code>{currentLesson.example}</code></pre>
                </div>

                <a
                  href="#projects"
                  className="inline-flex items-center space-x-2 text-xs text-cyan-400 hover:text-cyan-300 pt-2 font-mono"
                >
                  <FaLaptopCode />
                  <span>View Projects Built with {currentLesson.name} &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
