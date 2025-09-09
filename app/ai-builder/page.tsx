'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Wand2, Code, Eye, Rocket, Sparkles, Palette, LayoutTemplate, Zap, 
  Download, Copy, Edit3, Globe, Settings, FileText, ExternalLink,
  Save, RefreshCw, Monitor, Smartphone, Tablet
} from 'lucide-react'
import { toast } from 'sonner'

export default function AIBuilderPage() {
  const [prompt, setPrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [editableCode, setEditableCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [deploymentConfig, setDeploymentConfig] = useState({
    siteName: '',
    provider: 'vercel'
  })
  
  const iframeRef = useRef(null)

  const generateWebsite = async () => {
    if (!prompt.trim()) {
      toast.error('Please describe your website first')
      return
    }
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/ai-builder/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      
      if (!response.ok) {
        throw new Error('Generation failed')
      }
      
      const data = await response.json()
      setGeneratedCode(data.code)
      setEditableCode(data.code)
      setIsEditMode(false)
      
      // Update iframe with generated code
      updatePreview(data.code)
      
      toast.success('Website generated successfully!')
    } catch (error) {
      console.error('Generation failed:', error)
      toast.error('Failed to generate website. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const updatePreview = (code) => {
    if (iframeRef.current) {
      const blob = new Blob([code], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      iframeRef.current.src = url
    }
  }

  const handleCodeEdit = () => {
    setIsEditMode(true)
    setEditableCode(generatedCode)
  }

  const saveCodeChanges = () => {
    setGeneratedCode(editableCode)
    updatePreview(editableCode)
    setIsEditMode(false)
    toast.success('Code changes saved!')
  }

  const regenerateSection = async (section) => {
    if (!generatedCode) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/ai-builder/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: generatedCode,
          section,
          prompt: `Improve the ${section} section of this website`
        })
      })
      
      if (!response.ok) throw new Error('Regeneration failed')
      
      const data = await response.json()
      setGeneratedCode(data.code)
      setEditableCode(data.code)
      updatePreview(data.code)
      
      toast.success(`${section} section regenerated!`)
    } catch (error) {
      toast.error(`Failed to regenerate ${section}`)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    toast.success('Code copied to clipboard!')
  }

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'website.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Website downloaded!')
  }

  const handleDeploy = async () => {
    if (!generatedCode || !deploymentConfig.siteName) {
      toast.error('Please provide a site name')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/ai-builder/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: generatedCode,
          siteName: deploymentConfig.siteName,
          provider: deploymentConfig.provider
        })
      })

      if (!response.ok) throw new Error('Deployment failed')

      const data = await response.json()
      setIsDeployDialogOpen(false)
      toast.success(`Website deployed! Visit: ${data.url}`)
    } catch (error) {
      toast.error('Deployment failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getDevicePreviewClass = () => {
    switch (previewDevice) {
      case 'mobile': return 'w-80 h-96'
      case 'tablet': return 'w-96 h-80'
      default: return 'w-full h-96'
    }
  }

  const templates = [
    {
      id: 1,
      name: 'E-commerce Store',
      description: 'Modern online store with cart and checkout',
      prompt: 'Create a modern e-commerce website for selling handmade jewelry. Include a product catalog, shopping cart, checkout process, and customer reviews. Use a clean, minimalist design with a warm color palette.',
      icon: <LayoutTemplate className="w-5 h-5 text-blue-500" />,
      color: 'from-blue-50 to-blue-100'
    },
    {
      id: 2,
      name: 'SaaS Landing Page',
      description: 'Professional SaaS landing with pricing tiers',
      prompt: 'Build a SaaS landing page for a project management tool. Include hero section, features showcase, pricing tiers, testimonials, and call-to-action buttons. Use a professional blue and white color scheme.',
      icon: <Zap className="w-5 h-5 text-purple-500" />,
      color: 'from-purple-50 to-purple-100'
    },
    {
      id: 3,
      name: 'Portfolio Website',
      description: 'Creative portfolio with project showcase',
      prompt: 'Design a creative portfolio website for a graphic designer. Include about section, portfolio gallery, services offered, client testimonials, and contact form. Use a modern, creative layout with bold typography.',
      icon: <Palette className="w-5 h-5 text-amber-500" />,
      color: 'from-amber-50 to-amber-100'
    },
    {
      id: 4,
      name: 'Restaurant Website',
      description: 'Restaurant site with menu and reservations',
      prompt: 'Create a restaurant website with menu display, online reservations, location info, and photo gallery. Use warm colors and appetizing food imagery.',
      icon: <Sparkles className="w-5 h-5 text-rose-500" />,
      color: 'from-rose-50 to-rose-100'
    },
    {
      id: 5,
      name: 'Blog/Content Site',
      description: 'Content-focused blog with modern layout',
      prompt: 'Build a modern blog website for a tech startup. Include article listing, individual post pages, author profiles, categories, search functionality, and newsletter signup. Use a clean, readable design.',
      icon: <FileText className="w-5 h-5 text-green-500" />,
      color: 'from-green-50 to-green-100'
    },
    {
      id: 6,
      name: 'Agency Website',
      description: 'Professional agency site with services',
      prompt: 'Create a digital agency website showcasing services like web design, branding, and marketing. Include team section, case studies, client testimonials, and contact forms. Use a professional, modern design.',
      icon: <Globe className="w-5 h-5 text-indigo-500" />,
      color: 'from-indigo-50 to-indigo-100'
    }
  ]

  const handleTemplateClick = (template) => {
    setPrompt(template.prompt)
    setSelectedTemplate(template.id)
    toast.info(`"${template.name}" template selected`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Website Builder
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Describe your website idea and watch AI bring it to life instantly. 
            Edit, preview, and deploy with one click.
          </p>
        </div>

        {/* Template Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Start with a template
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all hover:scale-[1.02] border-2 ${selectedTemplate === template.id ? 'border-purple-500 ring-2 ring-purple-200' : 'border-slate-200'} overflow-hidden`}
                onClick={() => handleTemplateClick(template)}
              >
                <div className={`h-2 bg-gradient-to-r ${template.color}`}></div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    {template.icon}
                    <CardTitle className="text-sm font-semibold text-slate-800">
                      {template.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-600">
                    {template.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Builder Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left Panel - Prompt Input */}
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-slate-50 rounded-t-lg py-4">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Wand2 className="w-5 h-5 text-purple-600" />
                Describe Your Website
              </CardTitle>
              <CardDescription className="text-slate-500">
                Be as detailed as possible for better results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <Textarea
                placeholder="Describe your website in detail... 

For example:
'Create a modern e-commerce website for selling handmade jewelry. I want a clean, minimalist design with a warm color palette. Include a product catalog with filtering options, shopping cart, secure checkout, customer reviews, and an about us page. The homepage should have a hero section with a call-to-action button.'

The more specific you are, the better the result!"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[200px] resize-none border-slate-200 focus:border-purple-300 transition-colors"
                disabled={isLoading}
              />
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={generateWebsite}
                  disabled={isLoading || !prompt.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Website
                    </>
                  )}
                </Button>
                
                {prompt && (
                  <Button 
                    variant="outline" 
                    onClick={() => setPrompt('')}
                    disabled={isLoading}
                    className="shrink-0"
                  >
                    Clear
                  </Button>
                )}
              </div>

              {/* Quick Actions */}
              {generatedCode && (
                <div className="border-t pt-4 space-y-3">
                  <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Quick Improvements
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => regenerateSection('hero')}
                      disabled={isLoading}
                      className="text-xs"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Regenerate Hero
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => regenerateSection('colors')}
                      disabled={isLoading}
                      className="text-xs"
                    >
                      <Palette className="w-3 h-3 mr-1" />
                      Change Colors
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Panel - Results */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 rounded-t-lg py-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Eye className="w-5 h-5 text-blue-600" />
                    Generated Website
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    {generatedCode ? 'Preview and customize your website' : 'Your website will appear here'}
                  </CardDescription>
                </div>
                
                {/* Device Toggle */}
                {generatedCode && (
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                      onClick={() => setPreviewDevice('desktop')}
                      className="p-2"
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                      onClick={() => setPreviewDevice('tablet')}
                      className="p-2"
                    >
                      <Tablet className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                      onClick={() => setPreviewDevice('mobile')}
                      className="p-2"
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {!generatedCode && !isLoading && (
                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">Your website will appear here</p>
                  <p className="text-sm mt-1">Describe your website and click generate to start</p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-12">
                  <div className="relative mx-auto mb-6">
                    <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                  <p className="text-slate-700 font-medium">AI is crafting your website...</p>
                  <p className="text-sm text-slate-500 mt-1">This may take a few moments</p>
                </div>
              )}

              {generatedCode && (
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1">
                    <TabsTrigger value="preview" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <Eye className="w-4 h-4" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <Code className="w-4 h-4" />
                      Code
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="preview" className="mt-4 space-y-4">
                    <div className="border border-slate-200 rounded-lg bg-white overflow-hidden flex justify-center">
                      <iframe 
                        ref={iframeRef}
                        className={`${getDevicePreviewClass()} border-0 rounded-lg`}
                        title="Website Preview"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleCodeEdit}
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Code
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={downloadCode}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Dialog open={isDeployDialogOpen} onOpenChange={setIsDeployDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md">
                            <Rocket className="w-4 h-4 mr-2" />
                            Deploy Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Deploy Your Website</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="siteName">Site Name</Label>
                              <Input
                                id="siteName"
                                placeholder="my-awesome-website"
                                value={deploymentConfig.siteName}
                                onChange={(e) => setDeploymentConfig({...deploymentConfig, siteName: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="provider">Hosting Provider</Label>
                              <Select 
                                value={deploymentConfig.provider} 
                                onValueChange={(value) => setDeploymentConfig({...deploymentConfig, provider: value})}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select provider" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="vercel">Vercel</SelectItem>
                                  <SelectItem value="netlify">Netlify</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button 
                              onClick={handleDeploy} 
                              disabled={isLoading || !deploymentConfig.siteName}
                              className="w-full"
                            >
                              {isLoading ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Deploying...
                                </>
                              ) : (
                                <>
                                  <Rocket className="w-4 h-4 mr-2" />
                                  Deploy Website
                                </>
                              )}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" className="mt-4">
                    {!isEditMode ? (
                      <div className="bg-slate-900 rounded-lg p-4 text-slate-100 font-mono text-sm max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap">{generatedCode}</pre>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Textarea
                          value={editableCode}
                          onChange={(e) => setEditableCode(e.target.value)}
                          className="min-h-[400px] font-mono text-sm"
                          placeholder="Edit your website code here..."
                        />
                        <div className="flex gap-3">
                          <Button onClick={saveCodeChanges}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={() => setIsEditMode(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {!isEditMode && (
                      <div className="mt-4 flex gap-3">
                        <Button variant="outline" size="sm" onClick={copyToClipboard}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Code
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadCode}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" onClick={handleCodeEdit}>
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}