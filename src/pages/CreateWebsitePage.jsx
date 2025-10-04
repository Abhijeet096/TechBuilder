import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { mockSitesApi, simulateAiContent } from '../services/mockApi';
import { useNavigate } from 'react-router-dom';

const templates = [
  { id: 'clean', name: 'Clean', previewClass: 'from-primary/10 to-primary/5' },
  { id: 'minimal', name: 'Minimal', previewClass: 'from-purple-100 to-purple-50' },
  { id: 'bold', name: 'Bold', previewClass: 'from-indigo-100 to-indigo-50' },
];

export default function CreateWebsitePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [templateId, setTemplateId] = useState(templates[0].id);
  const [aiContent, setAiContent] = useState(null);

  const logoPreview = useMemo(() => logoFile ? URL.createObjectURL(logoFile) : null, [logoFile]);

  const next = () => setStep(s => Math.min(4, s + 1));
  const prev = () => setStep(s => Math.max(1, s - 1));

  const handleGenerateAi = async () => {
    setLoading(true);
    const res = await simulateAiContent({ businessName, description });
    setAiContent(res);
    setLoading(false);
  };

  const handleCreate = async () => {
    setLoading(true);
    const site = await mockSitesApi.createSite({
      userId: user.id,
      business: { name: businessName, description, email, phone, logo: logoPreview },
      templateId,
      content: aiContent,
    });
    setLoading(false);
    navigate(`/preview/${site.id}`);
  };

  return (
    <div>
      <Header />
      <main className="container-max py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Create Website</h1>
            <div className="text-sm text-gray-600">Step {step} of 4</div>
          </div>

          <div className="card mt-6">
            <div className="card-body">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Business Name</label>
                    <input value={businessName} onChange={e=>setBusinessName(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={description} onChange={e=>setDescription(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" rows={3} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Logo Upload</label>
                    <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files?.[0] || null)} className="mt-1" />
                    {logoPreview && <img src={logoPreview} alt="logo" className="h-16 mt-2 rounded" />}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Contact Email</label>
                      <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Phone</label>
                      <input value={phone} onChange={e=>setPhone(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map(t => (
                      <button type="button" key={t.id} onClick={() => setTemplateId(t.id)} className={`card text-left ${templateId === t.id ? 'ring-2 ring-primary' : ''}`}>
                        <div className="card-body">
                          <div className={`aspect-video rounded-md bg-gradient-to-br ${t.previewClass}`} />
                          <div className="mt-3 font-medium">{t.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <Button variant="secondary" onClick={handleGenerateAi} disabled={loading || !businessName || !description}>
                    Generate AI Content
                  </Button>
                  <div className="mt-4">
                    {loading ? (
                      <Loader label="Generating content..." />
                    ) : aiContent ? (
                      <div className="space-y-4">
                        <div>
                          <div className="font-semibold">About Us</div>
                          <p className="text-sm text-gray-700 mt-1">{aiContent.about}</p>
                        </div>
                        <div>
                          <div className="font-semibold">Services</div>
                          <ul className="list-disc pl-5 text-sm text-gray-700">
                            {aiContent.services.map(s => <li key={s}>{s}</li>)}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">Enter details in Step 1, then click Generate.</div>
                    )}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="font-semibold">Summary</div>
                  <div className="text-sm text-gray-700">Business: {businessName}</div>
                  <div className="text-sm text-gray-700">Template: {templateId}</div>
                  <div className="text-sm text-gray-700">Email: {email} | Phone: {phone}</div>
                  {aiContent && (
                    <div className="text-sm text-gray-700">About: {aiContent.about.slice(0, 120)}...</div>
                  )}
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <Button variant="secondary" onClick={prev} disabled={step === 1 || loading}>Back</Button>
                {step < 4 ? (
                  <Button onClick={next} disabled={(step === 1 && !businessName) || (step === 3 && !aiContent) || loading}>Next</Button>
                ) : (
                  <Button onClick={handleCreate} disabled={loading || !aiContent}>Generate Website</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
