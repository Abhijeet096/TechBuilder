import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockSitesApi } from '../services/mockApi';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await mockSitesApi.listSites(user.id);
      if (mounted) setSites(data);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [user.id]);

  return (
    <div>
      <Header />
      <div className="container-max py-6">
        <div className="md:flex md:gap-6">
          <Sidebar />
          <main className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              <Button onClick={() => navigate('/create')}>Create New Website</Button>
            </div>

            <section id="sites" className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">My Websites</h2>
              {loading ? (
                <div className="mt-6"><Loader label="Loading websites..." /></div>
              ) : sites.length === 0 ? (
                <div className="mt-6 text-gray-600">No websites yet. Click "Create New Website" to start.</div>
              ) : (
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sites.map(site => (
                    <div className="card" key={site.id}>
                      <div className="card-body">
                        <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center text-gray-500">Preview</div>
                        <div className="mt-3 font-semibold text-gray-900">{site.business?.name || 'Untitled'}</div>
                        <div className="text-sm text-gray-600 truncate">{site.business?.description}</div>
                        <div className="mt-4 flex gap-3">
                          <Link to={`/preview/${site.id}`} className="btn btn-secondary">Preview</Link>
                          <Link to={`/preview/${site.id}`} className="btn btn-primary">Edit</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section id="templates" className="mt-10">
              <h2 className="text-lg font-semibold text-gray-900">Templates</h2>
              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(t => (
                  <div key={t} className="card">
                    <div className="card-body">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-md" />
                      <div className="mt-3 font-medium">Template {t}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="settings" className="mt-10">
              <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
              <p className="text-sm text-gray-600 mt-2">Account settings will appear here.</p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
