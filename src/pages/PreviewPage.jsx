import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import { mockSitesApi } from '../services/mockApi';

export default function PreviewPage() {
  const { siteId } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await mockSitesApi.getSite(siteId);
      if (mounted) setSite(data);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [siteId]);

  const handleInlineChange = (field, value) => {
    setSite(prev => ({ ...prev, content: { ...prev.content, [field]: value } }));
  };

  const handleBusinessChange = (field, value) => {
    setSite(prev => ({
      ...prev,
      business: { ...prev.business, [field]: value },
    }));
  };

  const handleLogoFile = (file) => {
    const url = file ? URL.createObjectURL(file) : null;
    setSite(prev => ({
      ...prev,
      business: { ...prev.business, logo: url },
    }));
  };

  const save = async () => {
    setLoading(true);
    const updated = await mockSitesApi.updateSite(site.id, {
      business: site.business,
      content: site.content,
    });
    setSite(updated);
    setLoading(false);
    setEditing(false);
  };

  const TemplateComp = useMemo(() => {
    if (!site) return () => null;
    switch (site.templateId) {
      case 'minimal':
        return MinimalTemplate;
      case 'bold':
        return BoldTemplate;
      default:
        return CleanTemplate;
    }
  }, [site]);

  return (
    <div>
      <Header />
      <main className="container-max py-8">
        {loading ? (
          <Loader label="Loading preview..." />
        ) : !site ? (
          <div className="text-gray-600">Site not found.</div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Preview: {site.business?.name}</h1>
              <div className="flex gap-3">
                {!editing ? (
                  <Button onClick={() => setEditing(true)}>Edit</Button>
                ) : (
                  <>
                    <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
                    <Button onClick={save}>Save</Button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6">
              <TemplateComp
                site={site}
                editing={editing}
                onChange={handleInlineChange}
                onBusinessChange={handleBusinessChange}
                onLogoChange={handleLogoFile}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Editable({ value, onChange, editing, className }) {
  if (!editing) return <div className={className}>{value}</div>;
  return (
    <textarea
      className={`w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
    />
  );
}

function CleanTemplate({ site, editing, onChange, onBusinessChange, onLogoChange }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-white border-b p-6">
        <div className="flex items-center gap-3">
          {site.business?.logo && <img src={site.business.logo} alt="logo" className="h-10 w-10 rounded" />}
          {!editing ? (
            <div className="text-lg font-semibold">{site.business?.name}</div>
          ) : (
            <input
              className="text-lg font-semibold w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary"
              value={site.business?.name || ''}
              onChange={(e) => onBusinessChange('name', e.target.value)}
            />
          )}
        </div>
        {editing && (
          <div className="mt-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onLogoChange(e.target.files?.[0] || null)}
            />
          </div>
        )}
      </div>
      <div className="bg-background p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-body">
              <div className="font-semibold">About Us</div>
              <Editable value={site.content?.about || ''} editing={editing} onChange={(v) => onChange('about', v)} className="mt-2 text-sm text-gray-700" />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="font-semibold">Services</div>
              {!editing ? (
                <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                  {(site.content?.services || []).map(s => <li key={s}>{s}</li>)}
                </ul>
              ) : (
                <textarea
                  className="w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary mt-2 text-sm"
                  value={(site.content?.services || []).join('\n')}
                  onChange={(e) => onChange('services', e.target.value.split('\n'))}
                  rows={6}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border-t p-6 text-sm text-gray-600">
        Contact: {site.business?.email} • {site.business?.phone}
      </div>
    </div>
  );
}

function MinimalTemplate({ site, editing, onChange, onBusinessChange }) {
  return (
    <div className="p-8 bg-white border rounded-lg">
      {!editing ? (
        <div className="text-2xl font-semibold">{site.business?.name}</div>
      ) : (
        <input
          className="text-2xl font-semibold w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary"
          value={site.business?.name || ''}
          onChange={(e) => onBusinessChange('name', e.target.value)}
        />
      )}
      <Editable value={site.content?.about || ''} editing={editing} onChange={(v) => onChange('about', v)} className="mt-4 text-gray-700" />
      <div className="mt-6 font-semibold">Services</div>
      {!editing ? (
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
          {(site.content?.services || []).map(s => <li key={s}>{s}</li>)}
        </ul>
      ) : (
        <textarea
          className="w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary mt-2 text-sm"
          value={(site.content?.services || []).join('\n')}
          onChange={(e) => onChange('services', e.target.value.split('\n'))}
          rows={6}
        />
      )}
      <div className="mt-6 text-sm text-gray-600">Contact: {site.business?.email} • {site.business?.phone}</div>
    </div>
  );
}

function BoldTemplate({ site, editing, onChange, onBusinessChange, onLogoChange }) {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-lg border">
      <div className="flex items-center gap-3">
        {site.business?.logo && <img src={site.business.logo} alt="logo" className="h-10 w-10 rounded" />}
        {!editing ? (
          <div className="text-2xl font-bold text-gray-900">{site.business?.name}</div>
        ) : (
          <input
            className="text-2xl font-bold text-gray-900 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary"
            value={site.business?.name || ''}
            onChange={(e) => onBusinessChange('name', e.target.value)}
          />
        )}
      </div>
      {editing && (
        <div className="mt-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onLogoChange(e.target.files?.[0] || null)}
          />
        </div>
      )}
      <Editable value={site.content?.about || ''} editing={editing} onChange={(v) => onChange('about', v)} className="mt-4 text-gray-800" />
      <div className="mt-6 font-semibold text-gray-900">Our Services</div>
      {!editing ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {(site.content?.services || []).map(s => (
            <span key={s} className="px-3 py-1 rounded-full bg-white border text-sm text-gray-700">{s}</span>
          ))}
        </div>
      ) : (
        <textarea
          className="w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary mt-2 text-sm"
          value={(site.content?.services || []).join('\n')}
          onChange={(e) => onChange('services', e.target.value.split('\n'))}
          rows={6}
        />
      )}
      <div className="mt-6 text-sm text-gray-700">Contact: {site.business?.email} • {site.business?.phone}</div>
    </div>
  );
}
