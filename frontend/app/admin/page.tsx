"use client"

import { useState } from "react"
import { Check, Copy, Edit, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock data for questions
const mockQuestions = [
  {
    id: 1,
    question: "Welk van de volgende is GEEN vroeg teken van een ransomware-aanval?",
    options: [
      "Ongebruikelijke netwerkactiviteit buiten kantooruren",
      "Meerdere mislukte inlogpogingen op verschillende accounts",
      "Regelmatige software-updates van bekende leveranciers",
      "Onverwachte wijzigingen in bestandsextensies",
    ],
    correctAnswer: 2,
    explanation:
      "Regelmatige software-updates van bekende leveranciers zijn juist een teken van goede beveiliging en geen indicatie van een ransomware-aanval. De andere opties zijn allemaal mogelijke vroege tekenen van een aanval.",
    category: "Detectie",
    difficulty: "Beginner",
    status: "Actief",
    createdAt: "2023-10-15",
    updatedAt: "2023-11-02",
  },
  {
    id: 2,
    question: "Wat moet u doen als u verdachte e-mailbijlagen ontvangt?",
    options: [
      "Open de bijlage in een beveiligde omgeving om de inhoud te controleren",
      "Stuur de e-mail door naar collega's om te vragen of zij het herkennen",
      "Meld het direct aan uw IT-beveiligingsteam zonder de bijlage te openen",
      "Antwoord de afzender om te vragen wat de bijlage bevat",
    ],
    correctAnswer: 2,
    explanation:
      "U moet verdachte e-mails direct melden aan uw IT-beveiligingsteam zonder de bijlage te openen. Het openen, doorsturen of beantwoorden kan het risico op infectie vergroten.",
    category: "Preventie",
    difficulty: "Beginner",
    status: "Actief",
    createdAt: "2023-10-18",
    updatedAt: "2023-10-18",
  },
  {
    id: 3,
    question: "Welke actie kan het risico op een ransomware-aanval verminderen?",
    options: [
      "Alle medewerkers beheerderrechten geven voor efficiëntie",
      "Regelmatig back-ups maken en deze offline bewaren",
      "Alle externe apparaten automatisch toestaan op het netwerk",
      "Wachtwoorden delen binnen teams voor noodgevallen",
    ],
    correctAnswer: 1,
    explanation:
      "Regelmatig back-ups maken en deze offline bewaren is een cruciale beschermingsmaatregel tegen ransomware. De andere opties verhogen juist het risico op een succesvolle aanval.",
    category: "Preventie",
    difficulty: "Gemiddeld",
    status: "Actief",
    createdAt: "2023-11-05",
    updatedAt: "2023-11-10",
  },
  {
    id: 4,
    question: "Wat is een typisch gedrag van ransomware zodra het een systeem heeft geïnfecteerd?",
    options: [
      "Het vertraagt het systeem om detectie te voorkomen",
      "Het begint onmiddellijk met het versleutelen van bestanden",
      "Het stuurt automatisch een e-mail naar de beheerder",
      "Het installeert eerst updates om kwetsbaarheden te dichten",
    ],
    correctAnswer: 1,
    explanation:
      "Ransomware begint typisch onmiddellijk met het versleutelen van bestanden zodra het een systeem heeft geïnfecteerd. Dit is het primaire doel van de malware om later losgeld te kunnen eisen.",
    category: "Detectie",
    difficulty: "Gemiddeld",
    status: "Actief",
    createdAt: "2023-11-12",
    updatedAt: "2023-11-12",
  },
  {
    id: 5,
    question: "Welke netwerkactiviteit kan wijzen op een actieve ransomware-infectie?",
    options: [
      "Regelmatige verbindingen met bekende cloudopslagdiensten",
      "Hoge CPU-belasting tijdens geplande back-ups",
      "Ongebruikelijke uitgaande verbindingen naar onbekende IP-adressen",
      "Periodieke software-updates van werkstations",
    ],
    correctAnswer: 2,
    explanation:
      "Ongebruikelijke uitgaande verbindingen naar onbekende IP-adressen kunnen wijzen op command-and-control communicatie van ransomware. De andere opties zijn normale netwerkactiviteiten.",
    category: "Detectie",
    difficulty: "Gevorderd",
    status: "Concept",
    createdAt: "2023-12-01",
    updatedAt: "2023-12-05",
  },
  {
    id: 6,
    question:
      "Welke van de volgende maatregelen is het meest effectief bij het beperken van de impact van een ransomware-aanval?",
    options: [
      "Antivirussoftware installeren op alle systemen",
      "Netwerksegmentatie implementeren",
      "Regelmatig beveiligingsupdates installeren",
      "Gebruikers trainen in het herkennen van phishing-e-mails",
    ],
    correctAnswer: 1,
    explanation:
      "Netwerksegmentatie beperkt de laterale beweging van ransomware binnen een netwerk, waardoor de impact van een aanval wordt beperkt tot specifieke segmenten in plaats van het hele netwerk.",
    category: "Mitigatie",
    difficulty: "Gevorderd",
    status: "Inactief",
    createdAt: "2023-09-20",
    updatedAt: "2023-10-15",
  },
]

export default function AdminPage() {
  const [questions, setQuestions] = useState(mockQuestions)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([])
  const [addQuestionOpen, setAddQuestionOpen] = useState(false)
  const [editQuestionOpen, setEditQuestionOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
    category: "",
    difficulty: "",
  })

  const filteredQuestions = questions.filter(
    (question) =>
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.difficulty.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectQuestion = (id: number) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter((qId) => qId !== id))
    } else {
      setSelectedQuestions([...selectedQuestions, id])
    }
  }

  const handleSelectAllQuestions = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([])
    } else {
      setSelectedQuestions(filteredQuestions.map((q) => q.id))
    }
  }

  const handleEditQuestion = (question: any) => {
    setCurrentQuestion(question)
    setEditQuestionOpen(true)
  }

  const handleSaveNewQuestion = () => {
    const newId = Math.max(...questions.map((q) => q.id)) + 1
    const today = new Date().toISOString().split("T")[0]

    const questionToAdd = {
      id: newId,
      ...newQuestion,
      status: "Concept",
      createdAt: today,
      updatedAt: today,
    }

    setQuestions([...questions, questionToAdd])
    setAddQuestionOpen(false)
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
      category: "",
      difficulty: "",
    })
  }

  const handleUpdateQuestion = () => {
    const updatedQuestions = questions.map((q) =>
      q.id === currentQuestion.id ? { ...currentQuestion, updatedAt: new Date().toISOString().split("T")[0] } : q,
    )
    setQuestions(updatedQuestions)
    setEditQuestionOpen(false)
    setCurrentQuestion(null)
  }

  const handleDeleteQuestions = () => {
    const updatedQuestions = questions.filter((q) => !selectedQuestions.includes(q.id))
    setQuestions(updatedQuestions)
    setSelectedQuestions([])
  }

  const handleDuplicateQuestion = (id: number) => {
    const questionToDuplicate = questions.find((q) => q.id === id)
    if (questionToDuplicate) {
      const newId = Math.max(...questions.map((q) => q.id)) + 1
      const today = new Date().toISOString().split("T")[0]

      const duplicatedQuestion = {
        ...questionToDuplicate,
        id: newId,
        question: `${questionToDuplicate.question} (kopie)`,
        status: "Concept",
        createdAt: today,
        updatedAt: today,
      }

      setQuestions([...questions, duplicatedQuestion])
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.options]
    updatedOptions[index] = value
    setNewQuestion({ ...newQuestion, options: updatedOptions })
  }

  const handleEditOptionChange = (index: number, value: string) => {
    if (currentQuestion) {
      const updatedOptions = [...currentQuestion.options]
      updatedOptions[index] = value
      setCurrentQuestion({ ...currentQuestion, options: updatedOptions })
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vraagbeheer</h1>
          <p className="text-muted-foreground">Beheer vragen voor de ransomware-response simulator</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={addQuestionOpen} onOpenChange={setAddQuestionOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nieuwe vraag
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Nieuwe vraag toevoegen</DialogTitle>
                <DialogDescription>Voeg een nieuwe vraag toe aan de ransomware-response simulator.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Vraag</Label>
                  <Textarea
                    id="question"
                    placeholder="Voer de vraag in"
                    className="min-h-[80px]"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Antwoordopties</Label>
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <RadioGroup
                        value={newQuestion.correctAnswer.toString()}
                        onValueChange={(value) =>
                          setNewQuestion({ ...newQuestion, correctAnswer: Number.parseInt(value) })
                        }
                        className="mt-2"
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      </RadioGroup>
                      <div className="flex-1 space-y-1">
                        <Label htmlFor={`option-${index}`} className="text-xs text-muted-foreground">
                          {index === newQuestion.correctAnswer ? "Juist antwoord" : "Antwoordoptie"}
                        </Label>
                        <Textarea
                          id={`option-${index}`}
                          placeholder={`Antwoordoptie ${index + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className="min-h-[60px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="explanation">Uitleg</Label>
                  <Textarea
                    id="explanation"
                    placeholder="Geef uitleg over het juiste antwoord"
                    className="min-h-[80px]"
                    value={newQuestion.explanation}
                    onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categorie</Label>
                    <Select
                      value={newQuestion.category}
                      onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecteer een categorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Detectie">Detectie</SelectItem>
                        <SelectItem value="Preventie">Preventie</SelectItem>
                        <SelectItem value="Mitigatie">Mitigatie</SelectItem>
                        <SelectItem value="Response">Response</SelectItem>
                        <SelectItem value="Recovery">Recovery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Moeilijkheidsgraad</Label>
                    <Select
                      value={newQuestion.difficulty}
                      onValueChange={(value) => setNewQuestion({ ...newQuestion, difficulty: value })}
                    >
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Selecteer een niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Gemiddeld">Gemiddeld</SelectItem>
                        <SelectItem value="Gevorderd">Gevorderd</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddQuestionOpen(false)}>
                  Annuleren
                </Button>
                <Button
                  type="submit"
                  onClick={handleSaveNewQuestion}
                  disabled={
                    !newQuestion.question ||
                    newQuestion.options.some((option) => !option) ||
                    !newQuestion.explanation ||
                    !newQuestion.category ||
                    !newQuestion.difficulty
                  }
                >
                  Vraag toevoegen
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {selectedQuestions.length > 0 && (
            <Button variant="outline" className="gap-2" onClick={handleDeleteQuestions}>
              <Trash2 className="h-4 w-4" />
              {selectedQuestions.length} verwijderen
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Zoek vragen..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Alle vragen</TabsTrigger>
          <TabsTrigger value="active">Actief</TabsTrigger>
          <TabsTrigger value="draft">Concept</TabsTrigger>
          <TabsTrigger value="inactive">Inactief</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md">
                <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-1">
                    <Checkbox
                      checked={selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0}
                      onCheckedChange={handleSelectAllQuestions}
                      aria-label="Selecteer alle vragen"
                    />
                  </div>
                  <div className="col-span-5">Vraag</div>
                  <div className="col-span-2">Categorie</div>
                  <div className="col-span-1">Niveau</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2 text-right">Acties</div>
                </div>
                <div className="divide-y">
                  {filteredQuestions.map((question) => (
                    <div key={question.id} className="grid grid-cols-12 items-center gap-2 p-4">
                      <div className="col-span-1">
                        <Checkbox
                          checked={selectedQuestions.includes(question.id)}
                          onCheckedChange={() => handleSelectQuestion(question.id)}
                          aria-label={`Selecteer vraag ${question.id}`}
                        />
                      </div>
                      <div className="col-span-5">
                        <div className="font-medium line-clamp-2">{question.question}</div>
                        <div className="mt-1 text-xs text-muted-foreground">Bijgewerkt op {question.updatedAt}</div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="font-normal">
                          {question.category}
                        </Badge>
                      </div>
                      <div className="col-span-1">
                        <Badge
                          variant="outline"
                          className={`font-normal ${
                            question.difficulty === "Beginner"
                              ? "bg-green-500/10 text-green-500"
                              : question.difficulty === "Gemiddeld"
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {question.difficulty}
                        </Badge>
                      </div>
                      <div className="col-span-1">
                        <Badge
                          variant="outline"
                          className={`font-normal ${
                            question.status === "Actief"
                              ? "bg-green-500/10 text-green-500"
                              : question.status === "Concept"
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {question.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditQuestion(question)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Bewerken</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Meer acties</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDuplicateQuestion(question.id)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Dupliceren
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" />
                              {question.status === "Actief" ? "Deactiveren" : "Activeren"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => handleSelectQuestion(question.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Verwijderen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Toont {filteredQuestions.length} van {questions.length} vragen
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Vorige
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Volgende
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="active">{/* Active questions content would go here */}</TabsContent>
        <TabsContent value="draft">{/* Draft questions content would go here */}</TabsContent>
        <TabsContent value="inactive">{/* Inactive questions content would go here */}</TabsContent>
      </Tabs>

      {/* Edit Question Dialog */}
      {currentQuestion && (
        <Dialog open={editQuestionOpen} onOpenChange={setEditQuestionOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Vraag bewerken</DialogTitle>
              <DialogDescription>Bewerk de geselecteerde vraag.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-question">Vraag</Label>
                <Textarea
                  id="edit-question"
                  placeholder="Voer de vraag in"
                  className="min-h-[80px]"
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <Label>Antwoordopties</Label>
                {currentQuestion.options.map((option: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <RadioGroup
                      value={currentQuestion.correctAnswer.toString()}
                      onValueChange={(value) =>
                        setCurrentQuestion({ ...currentQuestion, correctAnswer: Number.parseInt(value) })
                      }
                      className="mt-2"
                    >
                      <RadioGroupItem value={index.toString()} id={`edit-option-${index}`} />
                    </RadioGroup>
                    <div className="flex-1 space-y-1">
                      <Label htmlFor={`edit-option-${index}`} className="text-xs text-muted-foreground">
                        {index === currentQuestion.correctAnswer ? "Juist antwoord" : "Antwoordoptie"}
                      </Label>
                      <Textarea
                        id={`edit-option-${index}`}
                        placeholder={`Antwoordoptie ${index + 1}`}
                        value={option}
                        onChange={(e) => handleEditOptionChange(index, e.target.value)}
                        className="min-h-[60px]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-explanation">Uitleg</Label>
                <Textarea
                  id="edit-explanation"
                  placeholder="Geef uitleg over het juiste antwoord"
                  className="min-h-[80px]"
                  value={currentQuestion.explanation}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Categorie</Label>
                  <Select
                    value={currentQuestion.category}
                    onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, category: value })}
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Selecteer een categorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Detectie">Detectie</SelectItem>
                      <SelectItem value="Preventie">Preventie</SelectItem>
                      <SelectItem value="Mitigatie">Mitigatie</SelectItem>
                      <SelectItem value="Response">Response</SelectItem>
                      <SelectItem value="Recovery">Recovery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-difficulty">Moeilijkheidsgraad</Label>
                  <Select
                    value={currentQuestion.difficulty}
                    onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, difficulty: value })}
                  >
                    <SelectTrigger id="edit-difficulty">
                      <SelectValue placeholder="Selecteer een niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Gemiddeld">Gemiddeld</SelectItem>
                      <SelectItem value="Gevorderd">Gevorderd</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={currentQuestion.status}
                    onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Selecteer een status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Concept">Concept</SelectItem>
                      <SelectItem value="Actief">Actief</SelectItem>
                      <SelectItem value="Inactief">Inactief</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditQuestionOpen(false)}>
                Annuleren
              </Button>
              <Button
                type="submit"
                onClick={handleUpdateQuestion}
                disabled={
                  !currentQuestion.question ||
                  currentQuestion.options.some((option: string) => !option) ||
                  !currentQuestion.explanation ||
                  !currentQuestion.category ||
                  !currentQuestion.difficulty ||
                  !currentQuestion.status
                }
              >
                Wijzigingen opslaan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
