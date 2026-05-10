import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import { Expert } from '../types';

export default function ExpertListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [experts, setExperts] = useState<Expert[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const page = Number(searchParams.get('page') || 1);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => { (async () => { try { setLoading(true); setError(''); const res = await api.get('/experts', { params: { page, search, category } }); setExperts(res.data.data); setTotalPages(res.data.pagination.totalPages); } catch { setError('Failed to load experts'); } finally { setLoading(false); } })(); }, [page, search, category]);

  return <div className="space-y-4"><h1 className="text-xl font-semibold">Find an Expert</h1><div className="grid md:grid-cols-3 gap-3"><input className="border p-2" placeholder="Search by name" value={search} onChange={(e) => setSearchParams({ page: '1', search: e.target.value, category })} /><select className="border p-2" value={category} onChange={(e) => setSearchParams({ page: '1', search, category: e.target.value })}><option value="">All categories</option><option>Career</option><option>Finance</option><option>Tech</option></select></div>{loading && <p>Loading experts...</p>}{error && <p className="text-red-600">{error}</p>}<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{experts.map((expert) => <Link key={expert._id} to={`/experts/${expert._id}`} className="border bg-white p-4 shadow-sm"><p className="font-semibold">{expert.name}</p><p className="text-sm text-gray-600">{expert.category}</p><p className="text-sm">{expert.experience} years • ⭐ {expert.rating}</p></Link>)}</div><div className="flex gap-2">{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => <button key={p} className={`px-3 py-1 border ${p === page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`} onClick={() => setSearchParams({ page: String(p), search, category })}>{p}</button>)}</div></div>;
}
