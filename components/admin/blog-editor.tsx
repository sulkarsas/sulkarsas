"use client"

import { memo, useCallback, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/types/blog-post"
import { useFormValidation } from "@/hooks/use-form-validation"
import { Save, PlusCircle, Edit, ArrowRight, Loader2, Hash, Type, FileText, Tag, X } from "lucide-react"
import { MarkdownEditor } from "@/components/admin/markdown-editor"

interface BlogEditorProps {
  post: BlogPost | null
  isSaving: boolean
  onPostChange: (post: BlogPost) => void
  onSave: (publish?: boolean) => Promise<{ success: boolean; message: string }>
  onCancel: () => void
  onCreateNew: () => void
  onNextStep: () => void
}

export const BlogEditor = memo(function BlogEditor({
  post,
  isSaving,
  onPostChange,
  onSave,
  onCancel,
  onCreateNew,
  onNextStep,
}: BlogEditorProps) {
  // Estado para tags
  const [newTag, setNewTag] = useState("")
  const { errors, canSave, canPublish, validateSingleField, markFieldAsTouched, getFieldError } =
    useFormValidation(post)

  const handleFieldChange = useCallback(
    (field: keyof BlogPost, value: any) => {
      if (!post) return

      const updatedPost = { ...post, [field]: value }
      onPostChange(updatedPost)

      // Validar campo individual
      validateSingleField(field, value)
    },
    [post, onPostChange, validateSingleField],
  )

  const handleFieldBlur = useCallback(
    (field: string) => {
      markFieldAsTouched(field)
    },
    [markFieldAsTouched],
  )

  const handleSave = useCallback(
    async (publish = false) => {
      if (!post || (!canSave && !publish) || (publish && !canPublish)) return
      await onSave(publish)
    },
    [post, canSave, canPublish, onSave],
  )

  const addTag = useCallback(() => {
    if (!post || !newTag.trim()) return

    const tag = newTag.trim().toLowerCase()
    if (!post.tags.includes(tag)) {
      handleFieldChange("tags", [...post.tags, tag])
    }
    setNewTag("")
  }, [post, newTag, handleFieldChange])

  const removeTag = useCallback(
    (tagToRemove: string) => {
      if (!post) return
      handleFieldChange(
        "tags",
        post.tags.filter((tag) => tag !== tagToRemove),
      )
    },
    [post, handleFieldChange],
  )

  const generateSlugFromTitle = useCallback(() => {
    if (!post || !post.title) return

    const slug = post.title
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 50)

    handleFieldChange("slug", slug)
  }, [post, handleFieldChange])

  if (!post) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Edit className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No hay blog seleccionado</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Selecciona un blog para editar o crea uno nuevo</p>
          <Button onClick={onCreateNew} className="bg-sulkar-green hover:bg-sulkar-green/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Crear Nuevo Blog
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{post.title ? `Editando: ${post.title}` : "Nuevo Blog Post"}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {post.status === "published" ? "Blog publicado" : "Borrador"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleSave(false)} disabled={!canSave || isSaving} variant="outline">
            {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Guardar Borrador
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={!canPublish || isSaving}
            className="bg-sulkar-green hover:bg-sulkar-green/90"
          >
            {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Publicar
          </Button>
          <Button variant="outline" onClick={onCancel} disabled={isSaving}>
            Cancelar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario */}
        <div className="space-y-6">
          {/* Información básica */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Type className="h-4 w-4" />
                <h3 className="font-medium">Información Básica</h3>
              </div>

              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  onBlur={() => handleFieldBlur("title")}
                  placeholder="Título del blog post"
                  className={getFieldError("title") ? "border-red-500" : ""}
                  aria-describedby={getFieldError("title") ? "title-error" : undefined}
                />
                {getFieldError("title") && (
                  <p id="title-error" className="text-sm text-red-500 mt-1">
                    {getFieldError("title")}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateSlugFromTitle}
                    disabled={!post.title}
                  >
                    <Hash className="h-3 w-3 mr-1" />
                    Generar
                  </Button>
                </div>
                <Input
                  id="slug"
                  value={post.slug}
                  onChange={(e) => handleFieldChange("slug", e.target.value)}
                  placeholder="url-del-blog"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">URL amigable para el blog</p>
              </div>

              <div>
                <Label htmlFor="excerpt">Extracto *</Label>
                <Textarea
                  id="excerpt"
                  value={post.excerpt}
                  onChange={(e) => handleFieldChange("excerpt", e.target.value)}
                  onBlur={() => handleFieldBlur("excerpt")}
                  placeholder="Breve descripción del blog post"
                  rows={3}
                  className={getFieldError("excerpt") ? "border-red-500" : ""}
                  aria-describedby={getFieldError("excerpt") ? "excerpt-error" : undefined}
                />
                <div className="flex justify-between items-center mt-1">
                  {getFieldError("excerpt") && (
                    <p id="excerpt-error" className="text-sm text-red-500">
                      {getFieldError("excerpt")}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 ml-auto">{post.excerpt.length}/300 caracteres</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categorización */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-4 w-4" />
                <h3 className="font-medium">Categorización</h3>
              </div>

              <div>
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={post.category}
                  onValueChange={(value) => handleFieldChange("category", value)}
                  onOpenChange={() => handleFieldBlur("category")}
                >
                  <SelectTrigger className={getFieldError("category") ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exportacion">Exportación</SelectItem>
                    <SelectItem value="importacion">Importación</SelectItem>
                    <SelectItem value="frutas">Frutas</SelectItem>
                    <SelectItem value="logistica">Logística</SelectItem>
                    <SelectItem value="noticias">Noticias</SelectItem>
                    <SelectItem value="mercados">Mercados</SelectItem>
                    <SelectItem value="tecnologia">Tecnología</SelectItem>
                  </SelectContent>
                </Select>
                {getFieldError("category") && <p className="text-sm text-red-500 mt-1">{getFieldError("category")}</p>}
              </div>

              <div>
                <Label>Etiquetas</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Agregar etiqueta"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addTag} disabled={!newTag.trim()} size="sm">
                    Agregar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-500"
                        aria-label={`Eliminar etiqueta ${tag}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                {post.tags.length === 0 && <p className="text-xs text-gray-500 mt-1">No hay etiquetas agregadas</p>}
              </div>

              <div>
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={post.status}
                  onValueChange={(value: "draft" | "published") => handleFieldChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido */}
        <div className="space-y-4">
          <Card className="h-full">
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-4 w-4" />
                <h3 className="font-medium">Contenido</h3>
              </div>

              <div className="flex-1 flex flex-col">
                <MarkdownEditor
                  value={post.content}
                  onChange={(value) => handleFieldChange("content", value)}
                  placeholder="Escribe tu contenido aquí... Usa Markdown para dar formato:

# Título Principal
## Subtítulo  
### Subtítulo menor

**Texto en negrita** y *texto en cursiva*

- Lista de elementos
- Otro elemento
  
1. Lista numerada
2. Segundo elemento

> Cita importante

`código inline` o:

```
bloque de código
```

[Enlace](https://ejemplo.com)
![Imagen](https://ejemplo.com/imagen.jpg)"
                  label="Contenido (Markdown)"
                  className="flex-1"
                />
                
                {getFieldError("content") && (
                  <p id="content-error" className="text-sm text-red-500 mt-2">
                    {getFieldError("content")}
                  </p>
                )}
              </div>

              {post.content.trim().length > 0 && canSave && (
                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    onClick={onNextStep}
                    className="inline-flex items-center bg-sulkar-green hover:bg-sulkar-green/90"
                    disabled={isSaving}
                  >
                    Siguiente: Gestionar Imágenes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Indicadores de validación */}
      <Card className="bg-gray-50 dark:bg-gray-900/50">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Estado de validación</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${post.title ? "bg-green-500" : "bg-red-500"}`} />
              <span>Título</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${post.excerpt ? "bg-green-500" : "bg-red-500"}`} />
              <span>Extracto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${post.content ? "bg-green-500" : "bg-red-500"}`} />
              <span>Contenido</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${post.category ? "bg-green-500" : "bg-red-500"}`} />
              <span>Categoría</span>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
            {canPublish ? (
              <span className="text-green-600 dark:text-green-400">✓ Listo para publicar</span>
            ) : canSave ? (
              <span className="text-yellow-600 dark:text-yellow-400">⚠ Se puede guardar como borrador</span>
            ) : (
              <span className="text-red-600 dark:text-red-400">✗ Faltan campos requeridos</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
})
