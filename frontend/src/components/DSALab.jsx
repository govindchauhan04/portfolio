import { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { FiCode, FiPlay, FiSearch } from 'react-icons/fi'

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '')

const languages = {
  python: {
    label: 'Python',
    starter: '# Read input with input()\n# Print your answer with print()\n\nnums = [2, 7, 11, 15]\ntarget = 9\nseen = {}\nfor i, num in enumerate(nums):\n    if target - num in seen:\n        print([seen[target - num], i])\n        break\n    seen[num] = i',
  },
  javascript: {
    label: 'JavaScript',
    starter: 'const nums = [2, 7, 11, 15];\nconst target = 9;\nconst seen = new Map();\n\nfor (let i = 0; i < nums.length; i += 1) {\n  if (seen.has(target - nums[i])) {\n    console.log([seen.get(target - nums[i]), i]);\n    break;\n  }\n  seen.set(nums[i], i);\n}',
  },
  c: {
    label: 'C',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int nums[] = {2, 7, 11, 15};\n  int target = 9;\n\n  for (int i = 0; i < 4; i++) {\n    for (int j = i + 1; j < 4; j++) {\n      if (nums[i] + nums[j] == target) printf("%d %d\\n", i, j);\n    }\n  }\n  return 0;\n}',
  },
  cpp: {
    label: 'C++',
    starter: '#include <iostream>\n#include <unordered_map>\n#include <vector>\nusing namespace std;\n\nint main() {\n  vector<int> nums = {2, 7, 11, 15};\n  int target = 9;\n  unordered_map<int, int> seen;\n\n  for (int i = 0; i < (int)nums.size(); ++i) {\n    if (seen.count(target - nums[i])) {\n      cout << seen[target - nums[i]] << " " << i << "\\n";\n      return 0;\n    }\n    seen[nums[i]] = i;\n  }\n}',
  },
  java: {
    label: 'Java',
    starter: 'import java.util.*;\n\npublic class Main {\n  public static void main(String[] args) {\n    int[] nums = {2, 7, 11, 15};\n    int target = 9;\n    Map<Integer, Integer> seen = new HashMap<>();\n\n    for (int i = 0; i < nums.length; i++) {\n      if (seen.containsKey(target - nums[i])) {\n        System.out.println(seen.get(target - nums[i]) + " " + i);\n        break;\n      }\n      seen.put(nums[i], i);\n    }\n  }\n}',
  },
}

const tracks = [
  ['Arrays', ['Pair Sum', 'Maximum Subarray', 'Product Except Self', 'Rotate Array', 'Merge Intervals']],
  ['Strings', ['Valid Anagram', 'Longest Substring', 'String Compression', 'Palindrome Check', 'Minimum Window']],
  ['Linked Lists', ['Reverse List', 'Detect Cycle', 'Merge Lists', 'Remove Nth Node', 'LRU Cache']],
  ['Stacks & Queues', ['Valid Parentheses', 'Min Stack', 'Daily Temperatures', 'Next Greater Element', 'Sliding Window Maximum']],
  ['Binary Search', ['First Occurrence', 'Search Rotated Array', 'Find Peak', 'Koko Eating Bananas', 'Median of Arrays']],
  ['Trees', ['Tree Traversal', 'Maximum Depth', 'Lowest Common Ancestor', 'Serialize Tree', 'Diameter of Tree']],
  ['Heaps', ['Kth Largest Element', 'Top K Frequent', 'Merge K Lists', 'Task Scheduler', 'Median Finder']],
  ['Graphs', ['Number of Islands', 'Clone Graph', 'Course Schedule', 'Network Delay', 'Word Ladder']],
  ['Dynamic Programming', ['Climbing Stairs', 'Coin Change', 'Longest Increasing Subsequence', 'Edit Distance', 'Knapsack']],
  ['Backtracking', ['Subsets', 'Permutations', 'Combination Sum', 'N Queens', 'Sudoku Solver']],
  ['Greedy', ['Jump Game', 'Gas Station', 'Partition Labels', 'Meeting Rooms', 'Candy Distribution']],
  ['Bit Manipulation', ['Single Number', 'Counting Bits', 'Reverse Bits', 'Bitwise AND Range', 'Maximum XOR']],
  ['Tries', ['Implement Trie', 'Word Search II', 'Replace Words', 'Map Sum Pairs', 'Maximum XOR']],
  ['Hashing', ['Two Sum', 'Group Anagrams', 'Longest Consecutive', 'Subarray Sum', 'Happy Number']],
  ['Recursion', ['Power Function', 'Generate Parentheses', 'Tower of Hanoi', 'Decode String', 'Expression Add Operators']],
  ['Math', ['GCD and LCM', 'Prime Sieve', 'Fast Exponentiation', 'Matrix Rotation', 'Integer Square Root']],
  ['Sorting', ['Merge Sort', 'Quick Sort', 'Count Inversions', 'Sort Colors', 'Largest Number']],
  ['Two Pointers', ['Container With Water', 'Three Sum', 'Trapping Rain Water', 'Dutch Flag', 'Move Zeroes']],
  ['Intervals', ['Insert Interval', 'Merge Intervals', 'Non Overlapping', 'Meeting Rooms II', 'Employee Free Time']],
  ['Advanced', ['Segment Tree Range Sum', 'Fenwick Tree', 'Disjoint Set Union', 'Dijkstra Shortest Path', 'Bellman Ford']],
]

const questions = tracks.flatMap(([topic, titles]) =>
  Array.from({ length: 25 }, (_, index) => ({
    id: `${topic}-${index + 1}`,
    topic,
    title: titles[index % titles.length],
    difficulty: index < 8 ? 'Easy' : index < 19 ? 'Medium' : 'Hard',
    prompt: `Solve ${titles[index % titles.length]} using ${topic.toLowerCase()} techniques. Write a correct and efficient solution, then run it with your own input.`,
  }))
)

const difficultyStyle = { Easy: 'text-emerald-300', Medium: 'text-amber-300', Hard: 'text-rose-300' }

const arraySolutions = {
  'Pair Sum': {
    python: 'def two_sum(nums, target):\n    seen = {}\n    for i, value in enumerate(nums):\n        if target - value in seen:\n            return [seen[target - value], i]\n        seen[value] = i\n    return []',
    javascript: 'function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i];\n    seen.set(nums[i], i);\n  }\n  return [];\n}',
    c: '#include <stdlib.h>\nint* twoSum(int* a, int n, int target, int* size) {\n  for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++)\n    if (a[i] + a[j] == target) { int* r = malloc(2 * sizeof(int)); r[0] = i; r[1] = j; *size = 2; return r; }\n  *size = 0; return NULL;\n}',
    java: 'import java.util.*;\nclass Solution {\n  int[] twoSum(int[] a, int target) {\n    Map<Integer,Integer> seen = new HashMap<>();\n    for (int i = 0; i < a.length; i++) {\n      if (seen.containsKey(target - a[i])) return new int[]{seen.get(target-a[i]), i};\n      seen.put(a[i], i);\n    } return new int[0];\n  }\n}',
  },
  'Maximum Subarray': {
    python: 'def max_subarray(nums):\n    best = current = nums[0]\n    for value in nums[1:]:\n        current = max(value, current + value)\n        best = max(best, current)\n    return best',
    javascript: 'function maxSubArray(nums) {\n  let best = nums[0], current = nums[0];\n  for (const value of nums.slice(1)) { current = Math.max(value, current + value); best = Math.max(best, current); }\n  return best;\n}',
    c: 'int maxSubArray(int* a, int n) {\n  int best = a[0], current = a[0];\n  for (int i = 1; i < n; i++) { current = a[i] > current + a[i] ? a[i] : current + a[i]; best = best > current ? best : current; }\n  return best;\n}',
    java: 'class Solution { int maxSubArray(int[] a) { int best=a[0], cur=a[0]; for(int i=1;i<a.length;i++){cur=Math.max(a[i],cur+a[i]);best=Math.max(best,cur);} return best; } }',
  },
  'Product Except Self': {
    python: 'def product_except_self(nums):\n    answer = [1] * len(nums)\n    prefix = 1\n    for i, value in enumerate(nums): answer[i], prefix = prefix, prefix * value\n    suffix = 1\n    for i in range(len(nums) - 1, -1, -1): answer[i], suffix = answer[i] * suffix, suffix * nums[i]\n    return answer',
    javascript: 'function productExceptSelf(a) {\n  const r = Array(a.length).fill(1); let p = 1;\n  for (let i=0;i<a.length;i++) { r[i]=p; p*=a[i]; }\n  p=1; for (let i=a.length-1;i>=0;i--) { r[i]*=p; p*=a[i]; } return r;\n}',
    c: 'void productExceptSelf(int* a, int n, int* r) { int p=1; for(int i=0;i<n;i++){r[i]=p;p*=a[i];} p=1; for(int i=n-1;i>=0;i--){r[i]*=p;p*=a[i];} }',
    java: 'class Solution { int[] productExceptSelf(int[] a) { int[] r=new int[a.length]; int p=1; for(int i=0;i<a.length;i++){r[i]=p;p*=a[i];} p=1; for(int i=a.length-1;i>=0;i--){r[i]*=p;p*=a[i];} return r; } }',
  },
}

const topicSolutions = {
  Arrays: 'def solve(nums, target):\n    seen = {}\n    for index, value in enumerate(nums):\n        if target - value in seen:\n            return [seen[target - value], index]\n        seen[value] = index\n    return []',
  Strings: 'def solve(text):\n    left = 0\n    best = 0\n    last_seen = {}\n    for right, char in enumerate(text):\n        if char in last_seen and last_seen[char] >= left:\n            left = last_seen[char] + 1\n        last_seen[char] = right\n        best = max(best, right - left + 1)\n    return best',
  'Linked Lists': 'def reverse_list(head):\n    previous = None\n    current = head\n    while current:\n        following = current.next\n        current.next = previous\n        previous, current = current, following\n    return previous',
  'Stacks & Queues': "def is_valid(text):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for char in text:\n        if char in '([{':\n            stack.append(char)\n        elif char in pairs:\n            if not stack or stack.pop() != pairs[char]:\n                return False\n    return not stack",
  'Binary Search': 'def binary_search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1',
  Trees: 'def max_depth(root):\n    if not root:\n        return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))',
  Heaps: 'import heapq\n\ndef kth_largest(nums, k):\n    heap = []\n    for value in nums:\n        heapq.heappush(heap, value)\n        if len(heap) > k:\n            heapq.heappop(heap)\n    return heap[0]',
  Graphs: 'from collections import deque\n\ndef bfs(graph, start):\n    queue, visited = deque([start]), {start}\n    while queue:\n        node = queue.popleft()\n        for neighbour in graph[node]:\n            if neighbour not in visited:\n                visited.add(neighbour)\n                queue.append(neighbour)\n    return visited',
  'Dynamic Programming': 'def solve(nums):\n    # dp[i] stores the best answer ending at i.\n    dp = [1] * len(nums)\n    for i in range(len(nums)):\n        for j in range(i):\n            if nums[j] < nums[i]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp, default=0)',
  Backtracking: 'def subsets(nums):\n    answer = []\n    def backtrack(index, path):\n        answer.append(path[:])\n        for i in range(index, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(0, [])\n    return answer',
  Greedy: 'def can_jump(nums):\n    furthest = 0\n    for index, jump in enumerate(nums):\n        if index > furthest:\n            return False\n        furthest = max(furthest, index + jump)\n    return True',
  'Bit Manipulation': 'def single_number(nums):\n    answer = 0\n    for value in nums:\n        answer ^= value\n    return answer',
  Tries: 'class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word):\n        node = self.root\n        for char in word:\n            node = node.children.setdefault(char, TrieNode())\n        node.end = True',
  Hashing: 'from collections import defaultdict\n\ndef group_anagrams(words):\n    groups = defaultdict(list)\n    for word in words:\n        groups[tuple(sorted(word))].append(word)\n    return list(groups.values())',
  Recursion: 'def power(base, exponent):\n    if exponent == 0:\n        return 1\n    half = power(base, exponent // 2)\n    result = half * half\n    return result if exponent % 2 == 0 else result * base',
  Math: 'def gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return abs(a)',
  Sorting: 'def merge_sort(nums):\n    if len(nums) <= 1:\n        return nums\n    mid = len(nums) // 2\n    left, right = merge_sort(nums[:mid]), merge_sort(nums[mid:])\n    merged = []\n    while left and right:\n        merged.append((left if left[0] <= right[0] else right).pop(0))\n    return merged + left + right',
  'Two Pointers': 'def three_sum(nums):\n    nums.sort()\n    answer = []\n    for i, value in enumerate(nums):\n        if i and value == nums[i - 1]:\n            continue\n        left, right = i + 1, len(nums) - 1\n        while left < right:\n            total = value + nums[left] + nums[right]\n            if total == 0:\n                answer.append([value, nums[left], nums[right]])\n                left, right = left + 1, right - 1\n            elif total < 0:\n                left += 1\n            else:\n                right -= 1\n    return answer',
  Intervals: 'def merge(intervals):\n    intervals.sort(key=lambda interval: interval[0])\n    merged = []\n    for start, end in intervals:\n        if not merged or merged[-1][1] < start:\n            merged.append([start, end])\n        else:\n            merged[-1][1] = max(merged[-1][1], end)\n    return merged',
  Advanced: 'class DSU:\n    def __init__(self, size):\n        self.parent = list(range(size))\n\n    def find(self, node):\n        if self.parent[node] != node:\n            self.parent[node] = self.find(self.parent[node])\n        return self.parent[node]\n\n    def union(self, a, b):\n        self.parent[self.find(a)] = self.find(b)',
}

const languageTopicSolutions = {
  javascript: {
    Arrays: 'function solve(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i += 1) {\n    if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i];\n    seen.set(nums[i], i);\n  }\n  return [];\n}',
    Strings: 'function solve(text) {\n  const last = new Map();\n  let left = 0, best = 0;\n  for (let right = 0; right < text.length; right += 1) {\n    left = Math.max(left, (last.get(text[right]) ?? -1) + 1);\n    last.set(text[right], right);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}',
    'Linked Lists': 'function reverseList(head) {\n  let previous = null;\n  while (head) {\n    const next = head.next;\n    head.next = previous;\n    previous = head;\n    head = next;\n  }\n  return previous;\n}',
    'Stacks & Queues': 'function isValid(text) {\n  const pairs = { ")": "(", "]": "[", "}": "{" };\n  const stack = [];\n  for (const char of text) {\n    if ("([{".includes(char)) stack.push(char);\n    else if (pairs[char] && stack.pop() !== pairs[char]) return false;\n  }\n  return stack.length === 0;\n}',
    'Binary Search': 'function binarySearch(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = left + Math.floor((right - left) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1; else right = mid - 1;\n  }\n  return -1;\n}',
    Trees: 'function maxDepth(root) {\n  return root ? 1 + Math.max(maxDepth(root.left), maxDepth(root.right)) : 0;\n}',
    Heaps: 'function kthLargest(nums, k) { return [...nums].sort((a, b) => b - a)[k - 1]; }',
    Graphs: 'function bfs(graph, start) {\n  const visited = new Set([start]), queue = [start];\n  for (let i = 0; i < queue.length; i += 1) {\n    for (const next of graph[queue[i]] || []) if (!visited.has(next)) { visited.add(next); queue.push(next); }\n  }\n  return [...visited];\n}',
    'Dynamic Programming': 'function lis(nums) {\n  const dp = Array(nums.length).fill(1);\n  for (let i = 0; i < nums.length; i += 1) for (let j = 0; j < i; j += 1) if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);\n  return Math.max(0, ...dp);\n}',
    Backtracking: 'function subsets(nums) {\n  const answer = [];\n  function visit(index, path) {\n    answer.push([...path]);\n    for (let i = index; i < nums.length; i += 1) { path.push(nums[i]); visit(i + 1, path); path.pop(); }\n  }\n  visit(0, []);\n  return answer;\n}',
    Greedy: 'function canJump(nums) {\n  let furthest = 0;\n  for (let i = 0; i < nums.length; i += 1) { if (i > furthest) return false; furthest = Math.max(furthest, i + nums[i]); }\n  return true;\n}',
    'Bit Manipulation': 'function singleNumber(nums) { return nums.reduce((answer, value) => answer ^ value, 0); }',
    Tries: 'class Trie {\n  constructor() { this.root = {}; }\n  insert(word) { let node = this.root; for (const char of word) node = node[char] ||= {}; node.end = true; }\n  search(word) { let node = this.root; for (const char of word) { if (!node[char]) return false; node = node[char]; } return Boolean(node.end); }\n}',
    Hashing: 'function groupAnagrams(words) {\n  const groups = new Map();\n  for (const word of words) { const key = [...word].sort().join(""); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(word); }\n  return [...groups.values()];\n}',
    Recursion: 'function power(base, exponent) {\n  if (exponent === 0) return 1;\n  const half = power(base, Math.floor(exponent / 2));\n  return half * half * (exponent % 2 ? base : 1);\n}',
    Math: 'function gcd(a, b) { while (b !== 0) [a, b] = [b, a % b]; return Math.abs(a); }',
    Sorting: 'function mergeSort(nums) {\n  if (nums.length < 2) return nums;\n  const mid = Math.floor(nums.length / 2), left = mergeSort(nums.slice(0, mid)), right = mergeSort(nums.slice(mid));\n  const result = []; let i = 0, j = 0;\n  while (i < left.length && j < right.length) result.push(left[i] <= right[j] ? left[i++] : right[j++]);\n  return result.concat(left.slice(i), right.slice(j));\n}',
    'Two Pointers': 'function threeSum(nums) {\n  nums.sort((a, b) => a - b); const answer = [];\n  for (let i = 0; i < nums.length; i += 1) {\n    if (i && nums[i] === nums[i - 1]) continue;\n    let left = i + 1, right = nums.length - 1;\n    while (left < right) {\n      const total = nums[i] + nums[left] + nums[right];\n      if (total === 0) { answer.push([nums[i], nums[left++], nums[right--]]); }\n      else if (total < 0) left += 1; else right -= 1;\n    }\n  }\n  return answer;\n}',
    Intervals: 'function merge(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]); const answer = [];\n  for (const interval of intervals) {\n    if (!answer.length || answer[answer.length - 1][1] < interval[0]) answer.push([...interval]);\n    else answer[answer.length - 1][1] = Math.max(answer[answer.length - 1][1], interval[1]);\n  }\n  return answer;\n}',
    Advanced: 'class DSU {\n  constructor(size) { this.parent = Array.from({ length: size }, (_, index) => index); }\n  find(node) { return this.parent[node] === node ? node : (this.parent[node] = this.find(this.parent[node])); }\n  union(a, b) { this.parent[this.find(a)] = this.find(b); }\n}',
  },
}

function solutionFor(question, selectedLanguage) {
  const fallback = selectedLanguage === 'python' ? topicSolutions[question.topic] : languages[selectedLanguage].starter
  const solution = arraySolutions[question.title]?.[selectedLanguage] || languageTopicSolutions[selectedLanguage]?.[question.topic] || fallback
  const marker = selectedLanguage === 'python' ? '#' : '//'
  return `${marker} ${question.title}\n${marker} ${question.topic} · ${question.difficulty}\n${marker} Reference solution — edit inputs or improve the approach.\n\n${solution}`
}

export default function DSALab() {
  const [selected, setSelected] = useState(questions[0])
  const [language, setLanguage] = useState('python')
  const [code, setCode] = useState(solutionFor(questions[0], 'python'))
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('All')
  const compilerRef = useRef(null)

  const visibleQuestions = useMemo(() => questions.filter((question) =>
    (topic === 'All' || question.topic === topic) && question.title.toLowerCase().includes(query.toLowerCase())
  ), [query, topic])

  const compilerUrl = `https://onecompiler.com/embed/${language}?theme=dark&hideLanguageSelection=true&hideNew=true&hideTitle=true&listenToEvents=true`

  const populateCompiler = () => {
    compilerRef.current?.contentWindow?.postMessage({
      eventType: 'populateCode',
      language,
      files: [{ name: { python: 'main.py', javascript: 'index.js', c: 'main.c', cpp: 'main.cpp', java: 'Main.java' }[language], content: code }],
    }, 'https://onecompiler.com')
  }

  const runInOneCompiler = () => {
    compilerRef.current?.contentWindow?.postMessage({ eventType: 'triggerRun' }, 'https://onecompiler.com')
  }

  useEffect(() => { populateCompiler() }, [code, language])

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage)
    setCode(solutionFor(selected, nextLanguage))
    setOutput('Reference solution loaded.')
  }

  const selectQuestion = (question) => {
    setSelected(question)
    setCode(solutionFor(question, language))
    setOutput(`${question.title} reference solution loaded.`)
  }

  const runCode = async () => {
    setRunning(true)
    setOutput('Running in the isolated compiler…')
    try {
      const { data } = await axios.post(`${API_BASE}/api/code/run`, { language, source_code: code, stdin })
      setOutput(data.output || 'Program completed with no output.')
    } catch (error) {
      setOutput(error.response?.data?.detail || 'Compiler is unavailable. Start the self-hosted Judge0 service and try again.')
    } finally {
      setRunning(false)
    }
  }

  return (
    <section id="dsa-lab" className="relative scroll-mt-28 px-4 py-24 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">DSA practice</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">500 DSA questions. One coding lab.</h2>
            <p className="mt-3 max-w-2xl text-white/60">Practice C, Java, Python, and JavaScript in an isolated compiler. Questions are organised by topic and difficulty.</p>
          </div>
          <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 font-mono text-xs text-cyan-200">{questions.length} questions</span>
        </div>

        <div className="mt-8 grid overflow-hidden rounded-2xl border border-white/10 bg-panel/80 shadow-glow lg:grid-cols-[18rem_1fr]">
          <aside className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
            <div className="relative"><FiSearch className="absolute left-3 top-3 text-white/40" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions" className="w-full rounded-lg border border-white/10 bg-black/20 py-2 pl-9 pr-3 text-sm outline-none focus:border-cyan-300/60" /></div>
            <select value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-3 w-full rounded-lg border border-white/10 bg-[#0b1020] px-3 py-2 text-sm outline-none"><option>All</option>{tracks.map(([name]) => <option key={name}>{name}</option>)}</select>
            <div className="mt-4 max-h-72 space-y-1 overflow-y-auto pr-1 lg:max-h-[38rem]">
              {visibleQuestions.map((question) => <button key={question.id} onClick={() => selectQuestion(question)} className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${selected.id === question.id ? 'bg-cyan-300/15 text-cyan-100' : 'text-white/65 hover:bg-white/5'}`}><span className="block truncate">{question.title}</span><span className={`text-xs ${difficultyStyle[question.difficulty]}`}>{question.topic} · {question.difficulty}</span></button>)}
            </div>
          </aside>

          <div className="min-w-0 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-mono text-xs text-cyan-300">{selected.topic} · {selected.id.split('-').at(-1)} / 25</p><h3 className="mt-1 font-display text-2xl text-white">{selected.title}</h3></div><span className={`font-mono text-sm ${difficultyStyle[selected.difficulty]}`}>{selected.difficulty}</span></div>
            <p className="mt-4 text-sm leading-6 text-white/65">{selected.prompt}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-sm text-white/55"><FiCode /> Language</div><select value={language} onChange={(event) => changeLanguage(event.target.value)} className="rounded-lg border border-white/10 bg-[#0b1020] px-3 py-2 text-sm outline-none">{Object.entries(languages).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></div>
            <textarea value={code} onChange={(event) => setCode(event.target.value)} spellCheck="false" className="mt-3 hidden h-80 w-full resize-y rounded-xl border border-white/10 bg-[#060a13] p-4 font-mono text-sm leading-6 text-cyan-50 outline-none focus:border-cyan-300/50 lg:block" aria-label="Code editor" />
            <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-[#060a13] lg:mt-4">
              <iframe
                key={language}
                ref={compilerRef}
                title="OneCompiler code editor"
                src={compilerUrl}
                onLoad={populateCompiler}
                className="h-[32rem] w-full bg-[#060a13] sm:h-[36rem]"
                allow="clipboard-read; clipboard-write"
              />
            </div>
            <button onClick={runInOneCompiler} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 font-medium text-[#07101a] transition hover:bg-cyan-200"><FiPlay />Run in OneCompiler</button>
            <p className="mt-2 text-xs text-white/45">The embedded editor supports standard input and shows output in OneCompiler.</p>
            {false && <>
            <label className="mt-4 block text-sm text-white/55">Standard input<textarea value={stdin} onChange={(event) => setStdin(event.target.value)} placeholder="Optional input" className="mt-2 h-20 w-full resize-y rounded-lg border border-white/10 bg-black/20 p-3 font-mono text-sm text-white outline-none focus:border-cyan-300/50" /></label>
            <button onClick={runCode} disabled={running} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 font-medium text-[#07101a] transition hover:bg-cyan-200 disabled:opacity-60"><FiPlay />{running ? 'Running…' : 'Run code'}</button>
            <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4"><div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-white/45"><FiTerminal /> Output</div><pre className="min-h-12 whitespace-pre-wrap break-words font-mono text-sm text-emerald-200">{output}</pre></div>
            </>}
          </div>
        </div>
      </div>
    </section>
  )
}
