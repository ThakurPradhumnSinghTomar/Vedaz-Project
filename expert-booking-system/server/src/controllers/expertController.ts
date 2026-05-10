import { Request, Response } from 'express';
import { Expert } from '../models/Expert';

export const getExperts = async (req: Request, res: Response) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 6);
  const search = String(req.query.search || '').trim();
  const category = String(req.query.category || '').trim();

  const query: any = {};
  if (search) query.name = { $regex: search, $options: 'i' };
  if (category) query.category = category;

  const [experts, total] = await Promise.all([
    Expert.find(query).skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 }),
    Expert.countDocuments(query)
  ]);

  res.json({
    data: experts,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
  });
};

export const getExpertById = async (req: Request, res: Response) => {
  const expert = await Expert.findById(req.params.id);
  if (!expert) {
    return res.status(404).json({ message: 'Expert not found' });
  }
  res.json(expert);
};
