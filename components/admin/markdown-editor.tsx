"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Edit
} from "lucide-react"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
}

export function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Escribe tu contenido en Markdown...",
  label = "Contenido",
  className = ""
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")

  // Funciones para insertar elementos de Markdown
  const insertMarkdown = (before: string, after: string = "", placeholder: string = "") => {
    const textarea = document.querySelector('textarea[data-markdown-editor]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const replacement = selectedText || placeholder
    
    const newValue = 
      value.substring(0, start) + 
      before + replacement + after + 
      value.substring(end)
    
    onChange(newValue)
    
    // Restaurar el foco y posición del cursor
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + replacement.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const toolbarButtons = [
    {
      icon: Heading1,
      label: "Título H1",
      action: () => insertMarkdown("# ", "", "Título Principal"),
    },
    {
      icon: Heading2,
      label: "Título H2",
      action: () => insertMarkdown("## ", "", "Subtítulo"),
    },
    {
      icon: Heading3,
      label: "Título H3",
      action: () => insertMarkdown("### ", "", "Subtítulo Menor"),
    },
    {
      icon: Bold,
      label: "Negrita",
      action: () => insertMarkdown("**", "**", "texto en negrita"),
    },
    {
      icon: Italic,
      label: "Cursiva",
      action: () => insertMarkdown("*", "*", "texto en cursiva"),
    },
    {
      icon: List,
      label: "Lista",
      action: () => insertMarkdown("- ", "", "elemento de lista"),
    },
    {
      icon: ListOrdered,
      label: "Lista numerada",
      action: () => insertMarkdown("1. ", "", "elemento numerado"),
    },
    {
      icon: Quote,
      label: "Cita",
      action: () => insertMarkdown("> ", "", "texto de cita"),
    },
    {
      icon: Code,
      label: "Código",
      action: () => insertMarkdown("`", "`", "código"),
    },
    {
      icon: Link,
      label: "Enlace",
      action: () => insertMarkdown("[", "](https://)", "texto del enlace"),
    },
    {
      icon: ImageIcon,
      label: "Imagen",
      action: () => insertMarkdown("![", "](https://)", "descripción de imagen"),
    },
  ]

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="text-sm font-medium">{label} *</label>
        {/* Toolbar */}
      <div className="markdown-toolbar flex flex-wrap gap-1 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
            title={button.label}
            type="button"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      {/* Editor con tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "edit" | "preview")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Editar
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Vista Previa
          </TabsTrigger>
        </TabsList>        <TabsContent value="edit" className="mt-0">
          <Textarea
            data-markdown-editor
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="markdown-editor min-h-[400px] font-mono text-sm resize-none"
            style={{ lineHeight: "1.6" }}
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Vista Previa del Contenido
                <Badge variant="secondary" className="ml-2">
                  {value.length} caracteres
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              {value.trim() ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold mt-6 mb-4 text-gray-900 dark:text-white border-b pb-2">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-5 mb-3 text-gray-800 dark:text-gray-100">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-medium mt-4 mb-2 text-gray-700 dark:text-gray-200">{children}</h3>,
                    h4: ({ children }) => <h4 className="text-lg font-medium mt-3 mb-2 text-gray-700 dark:text-gray-200">{children}</h4>,
                    p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-300">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                        {children}
                      </pre>
                    ),
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    img: ({ src, alt }) => (
                      <img 
                        src={src} 
                        alt={alt} 
                        className="max-w-full h-auto rounded-lg shadow-md my-4"
                      />
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-4">
                        <table className="min-w-full border border-gray-300 dark:border-gray-600">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold text-left">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {value}
                </ReactMarkdown>
              ) : (
                <p className="text-gray-400 italic text-center py-8">
                  Escribe algo en el editor para ver la vista previa aquí...
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Guía rápida */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
            📝 Guía Rápida de Markdown
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <p><code># Título H1</code></p>
              <p><code>## Título H2</code></p>
              <p><code>### Título H3</code></p>
              <p><code>**negrita**</code></p>
              <p><code>*cursiva*</code></p>
            </div>
            <div>
              <p><code>- Lista elemento</code></p>
              <p><code>1. Lista numerada</code></p>
              <p><code>&gt; Cita</code></p>
              <p><code>`código`</code></p>
              <p><code>[enlace](URL)</code></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
