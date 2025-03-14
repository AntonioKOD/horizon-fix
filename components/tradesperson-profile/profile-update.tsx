'use client'

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import { Textarea } from '../ui/textarea'
import { updateProfile } from '@/actions'
import {Label} from '@/components/ui/label'
import { useParams } from 'next/navigation'



interface ProfileUpdateProps {
  tradesperson: {
    id: string
    name: string
    phone: string
    businessName: string
    businessAddress: string
    businessType: string
    businessWebsite: string
    description: string
  }
}

export function TradesPersonProfileUpdate({tradesperson} : ProfileUpdateProps) {
  
  const { id } = useParams();
  if (typeof id !== 'string') {
    throw new Error('Invalid id');
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={(formData: FormData) => updateProfile(formData, id)} className='space-y-4'>
          <Label>Name</Label>
          <Input name='name' defaultValue={tradesperson?.name}/>
          <Label>Phone</Label>
          <Input name='phone' defaultValue={tradesperson?.phone} />
          <Label>Business Name</Label>
          <Input name='businessName' defaultValue={tradesperson?.businessName} />
          <Label>Business Address</Label>
          <Input name='businessAddress' defaultValue={tradesperson?.businessAddress} />
          <Label>Business Type</Label>
          <Input name='businessType' defaultValue={tradesperson?.businessType} />
          <Label>Business Website</Label>
          <Input name='businessWebsite' defaultValue={tradesperson?.businessWebsite} />
          <Label>Description</Label>
          <Textarea name='description' defaultValue={tradesperson?.description} />
          <Button type='submit'>Update Profile</Button>
          </form>
      </CardContent>
    </Card>

  )
}
