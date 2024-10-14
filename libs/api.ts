import Airtable from 'airtable';
import axios from 'axios';
import { Chef, Vote, PaystackResponse, AirtableAttachment } from './types';

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!);


export const getChefs = async (): Promise<Chef[]> => {
  try {
    const records = await base('Chefs').select().all();
    
    if (records.length === 0) {
      console.log('No records found in the Airtable base.');
      return [];
    }

    return records.map(record => {
      const imageAttachment = record.get('image') as AirtableAttachment[] | undefined;
      const imageUrl = imageAttachment && imageAttachment.length > 0 ? imageAttachment[0].url : null;

      return {
        id: record.get('id') as number | null,
        name: record.get('name') as string || 'Unnamed Chef',
        description: record.get('description') as string | null || '',
        image_url: imageUrl,
        votes: record.get('votes') as number | null || 0,
      };
    });
  } catch (error) {
    console.error('Error fetching chefs:', error);
    return [];
  }
};

export const getChefById = async (id: number): Promise<Chef | null> => {
  try {
    const records = await base('Chefs').select({ filterByFormula: `{id} = ${id}` }).all();
    if (records.length === 0) return null;
    const record = records[0];
    const imageAttachment = record.get('image') as AirtableAttachment[] | undefined;
    const imageUrl = imageAttachment && imageAttachment.length > 0 ? imageAttachment[0].url : null;

    return {
      id: record.get('id') as number | null,
      name: record.get('name') as string || 'Unnamed Chef',
      description: record.get('description') as string | null || '',
      image_url: imageUrl,
      votes: record.get('votes') as number | null || 0,
    };
  } catch (error) {
    console.error(`Error fetching chef with id ${id}:`, error);
    return null;
  }
};

export const submitVote = async (vote: Vote): Promise<void> => {
  try {
    // First, find the chef record
    const chefRecords = await base('Chefs').select({
      filterByFormula: `{id} = ${vote.chef_id}`,
    }).firstPage();

    if (chefRecords.length === 0) {
      throw new Error(`Chef with id ${vote.chef_id} not found`);
    }

    const chefRecord = chefRecords[0];

    // Create the vote record
    const voteRecord = await base('Votes').create([
      {
        fields: {
          email: vote.email,
          chef_id: [chefRecord.id], // Link to the Chef record
          num_votes: vote.num_votes,
          amount_paid: vote.amount_paid,
          transaction_id: vote.reference // Assuming you want to store the Paystack reference here
        },
      },
    ]);

    console.log('Vote record created:', voteRecord);

    // Update the chef's vote count
    const currentVotes = chefRecord.get('votes') as number || 0;
    await base('Chefs').update([
      {
        id: chefRecord.id,
        fields: {
          votes: currentVotes + vote.num_votes,
          'Votes 2': [...(chefRecord.get('Votes 2') as string[] || []), voteRecord[0].id],
        },
      },
    ]);

    console.log('Chef vote count and Votes 2 updated');
  } catch (error) {
    console.error('Error in submitVote:', error);
    throw error;
  }
};

export const verifyPaystackTransaction = async (reference: string): Promise<PaystackResponse> => {
  const response = await axios.get<PaystackResponse>(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );
  return response.data;
};
