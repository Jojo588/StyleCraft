import React, { useState } from 'react'
import '../App.css'
import Mannequin from '../components/Mannequin';
import OutfitSelector from '../components/OutfitSelector'
import PatternSelector from '../components/PatternSelector'
import FullScreenPreview from '../components/FullScreenPreview'
import { Download, Eye, RotateCcw } from 'lucide-react'
import html2canvas from 'html2canvas'
import KenteSelector from "../components/KenteSelector.js";
import kente1 from "../images/kente/1bc449239f79b8667a1108b9e72703a8.jpg";


function FashionCustomizer() {
   const [customization, setCustomization] = useState({
     outfitType: null,
     firstKente: kente1,
     extraKentes: [],
     secondKente: null,
     firstSecondaryKente: null,
     clothPattern: "none",
     step: 'outfit',
     mode: null
   });

  const [isViewing, setIsViewing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showFullPreview, setShowFullPreview] = useState(false)

  const handleOutfitSelect = (outfitType) => {
    setCustomization(prev => ({
      ...prev,
      outfitType,
      step: 'first-kente'
    }))
  }
  const handleFirstKenteDone = () => {
    setCustomization(prev => ({
      ...prev,
      step: 'cloth-design'
    }))
  }

  const handlefirstKenteSelect = (kente) => {
    setCustomization(prev => ({
      ...prev,
      firstKente: kente,
    }))
  }

  const handleClothDesignChoice = (choice) => {
    if (choice === 'combine') {
      setCustomization(prev => ({ ...prev, step: 'second-kente', mode: 'combine' }))
    } else if (choice === 'pattern') {
      setCustomization(prev => ({ ...prev, step: 'pattern-design', mode: 'pattern' }))
    } else {
      setCustomization(prev => ({ ...prev, step: 'keep-simple', mode: 'single' }))
    }
  }

  const handleAddExtrakente = (kente) => {
    setCustomization(prev => ({
      ...prev,
      extraKentes: [...prev.extraKentes, kente]
    }))
  }

  const handlePatternDesign = (pattern) => {
    setCustomization(prev => ({
      ...prev,
      step: 'second-kente',
      clothPattern: pattern,
      mode: 'blend'
    }))
  }

  const handleDoneAddingkentes = () => {
    setCustomization(prev => ({
      ...prev,
      step: 'complete'
    }))
  }

  const handleReset = () => {
    setCustomization({
      outfitType: null,
      firstKente: '#3b82f6',
      extraKentes: [],
      clothPattern: null,
      step: 'outfit',
      mode: null
    })
    setIsViewing(false)
  }

  const handleView = () => {
    setShowFullPreview(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    const mannequinElement = document.getElementById('mannequin-display')
    if (mannequinElement) {
      try {
        const canvas = await html2canvas(mannequinElement, {
          backgroundColor: '#ffffff',
          scale: 3,
          useCORS: true,
          allowTaint: true,
          width: mannequinElement.offsetWidth,
          height: mannequinElement.offsetHeight
        })

        const link = document.createElement('a')
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
        link.download = `fashion-design-${timestamp}.png`
        link.href = canvas.toDataURL('image/png', 1.0)

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      } catch (error) {
        console.error('Error saving image:', error)
        alert('There was an error saving your design. Please try again.')
      }
    }
    setIsSaving(false)
  }

  const getStepTitle = () => {
    switch (customization.step) {
      case 'outfit':
        return 'Choose Your Outfit Style'
      case 'first-kente':
        return 'Select Kente Cloth'
      case 'cloth-design':
        return 'Customize Cloth Design'
      case 'second-kente':
        return 'Add More Kente Cloths'
      case 'pattern-design':
        return 'Choose Pattern Design'
      case 'keep-simple':
        return 'Choose to Make Your Cloth Simple'
      case 'complete':
        return 'Your Fashion Design'
      default:
        return 'Fashion Customizer'
    }
  }

  const getProgressWidth = () => {
    switch (customization.step) {
      case 'outfit':
        return 20
      case 'first-kente':
        return 40
      case 'cloth-design':
        return 60
      case 'pattern-design':
        return 70
      case 'keep-simple':
        return 70
      case 'second-kente':
        return 80
      default:
        return 100
    }
  }

  return (
    <div className="app">
      <div className="container relative">
        <header className="header">
          <h1 className="title">Fashion <span className='text-teal-500'>Customizer</span></h1>
          <p className="subtitle">Design your perfect outfit with our interactive mannequin</p>
        </header>

        <div className={`main-grid ${customization.outfitType !== null ? 'with-mannequin' : ''} `}>

          {/* Mannequin Display */}
          {customization.outfitType !== null && (
            <div className="card mannequin-card max-md:w-full max-md:col-span-2 ">
              <div className="card-header">
                <h2 className="card-title">Your Design</h2>
              </div>
              <div className='flex justify-center items-center'>
              <Mannequin customization={customization} />
              </div>
              {customization.step === 'complete' && (
                <div className="action-buttons">
                  <button onClick={handleView} className="btn btn-outline">
                    <Eye size={16} /> Preview
                  </button>
                  <button onClick={handleSave} className="btn btn-primary" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <div className="spinner" /> Saving...
                      </>
                    ) : (
                      <>
                        <Download size={16} /> Save Design
                      </>
                    )}
                  </button>
                  <button onClick={handleReset} className="btn btn-outline hover:bg-teal-500 hover:text-white btn-danger">
                    <RotateCcw size={16} /> Start Over
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Customization Panel */}
          <div className={`card customization-card ${customization.outfitType === null ? 'full-width' : ''} max-md:col-span-2`}>
            <div className="customization-header">
              <h2 className="card-title">{getStepTitle()}</h2>
              <div className="progress-bar md:mb-20">
                <div className="progress-fill" style={{ width: `${getProgressWidth()}%` }} />
              </div>
            </div>

            {!isViewing && (
              <>
                {customization.step === 'outfit' && (
                  <OutfitSelector onSelect={handleOutfitSelect} />
                )}

                {customization.step === 'first-kente' && (
                  <KenteSelector
                    title="Choose Kente Cloth"
                    onKenteSelect={handlefirstKenteSelect}
                    handleDoneAddingkentes = {handleFirstKenteDone}
                    selectedKente={customization.firstKente}
                    customization={customization}
                  />
                )}

                {customization.step === 'cloth-design' && (
                  <div className="design-choice">
                    <p className="choice-text">Do you want to combine kentes or add a design?</p>
                    <div className="choice-buttons">
                      {[
                        {nav:'Combine Cloths', clothDesignChoice:'combine'},
                        {nav:'Add Pattern', clothDesignChoice:'pattern'},
                        {nav:'Keep Simple', clothDesignChoice:'none'},
                      ].map(options=>(
                        <button key={options.clothDesignChoice}
                          onClick={() => handleClothDesignChoice(options.clothDesignChoice)}
                          className="btn bg-teal-500 hover:bg-teal-700 text-white duration-300" >
                          {options.nav}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {customization.step === 'keep-simple' && (
                  <div className="choice-buttons">
                    <button
                      onClick={() => setCustomization(prev => ({
                        ...prev,
                        step: 'second-kente',
                        mode: 'blend'
                      }))}
                      className="btn btn-outline hover:bg-teal-500 hover:text-white"
                    >
                      Blend Cloths
                    </button>
                    <button
                      onClick={() => handleDoneAddingkentes()}
                      className="btn btn-outline hover:bg-teal-500 hover:text-white"
                    >
                      Maintain Single Cloth
                    </button>
                  </div>
                )}

                {customization.step === 'pattern-design' && (
                  <PatternSelector
                    title="Choose a pattern"
                    onPatternSelect={handlePatternDesign}
                    selectedPattern={customization.clothPattern}
                  />
                )}

                {customization.step === 'second-kente' && (
                  <div>
                    <KenteSelector
                      title="Choose another kente"
                      onKenteSelect={handleAddExtrakente}
                      selectedkente="#ffffff"
                      doneButton = {handleDoneAddingkentes}
                      showTitle={false}
                    />
                    
                    {customization.extraKentes.length > 0 && (
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600 capitalize">Added kente cloths:</p>
                        <div className="flex justify-center gap-2 mt-2">
                          {customization.extraKentes.map((c, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded-full border"
                              style={{ backgroundImage: `url(${c})`, backgroundSize: 'cover' }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {customization.step === 'complete' && (
                  <div className="completion-section">
                    <div className="success-message">🎉 Your design is complete!</div>
                    <p className="completion-text">
                      You can view your creation or save it as an image to share with others.
                    </p>
                    <div className="design-summary">
                      <h3 className="summary-title">Design Summary:</h3>
                      <div className="summary-content">
                        <p>
                          <strong>Outfit:</strong>{' '}
                          {customization.outfitType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <p>
                          <strong>Cloth:</strong> {customization.firstKente}{' '}
                          {customization.extraKentes.length > 0 &&
                            customization.extraKentes.map((col, idx) => (
                              <span key={idx}>+ {col} </span>
                            ))}
                          {customization.clothPattern && `with ${customization.clothPattern}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="global-success">
          <p>✅ Design saved successfully!</p>
        </div>
      )}

      <FullScreenPreview
        customization={customization}
        isOpen={showFullPreview}
        onClose={() => setShowFullPreview(false)}
        onEdit={() => {
          setShowFullPreview(false)
          setIsViewing(false)
        }}
      />
    </div>
  )
}

export default FashionCustomizer
