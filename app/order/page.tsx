// app/order/page.tsx or components/OrderForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const orderSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().min(10, 'Please enter a valid phone number'),
  deliveryMethod: z.enum(['Delivery', 'Pick up']),
  deliveryAddress: z.string().optional(),
  products: z.array(z.string()).min(1, 'Please select at least one product'),
  quantity: z.string().optional(),
  cupcakeFlavors: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
  paymentMethod: z.enum(['Cash on Delivery', 'Zelle']),
  preferredDate: z.date(),
  preferredTime: z.string().optional(),
  referenceImageUrl: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

const products = [
  { id: 'blowout', name: 'Signature Blowout ($15)', category: 'hair' },
  { id: 'curly-q', name: 'Curly Q ($17)', category: 'hair' },
  { id: 'flat-iron', name: 'Flat Iron ($10)', category: 'hair' },
  { id: 'blowout-curls', name: 'Blowout Curls ($15)', category: 'hair' },
  { id: 'heat-curls', name: 'Heat Styled Curls ($15)', category: 'hair' },
  { id: 'cupcakes', name: 'Cupcakes', category: 'baked' },
  { id: 'brownies', name: 'Brownies', category: 'baked' },
  { id: 'strawberries', name: 'Chocolate-Covered Strawberries', category: 'baked' },
  { id: 'tiramisu', name: 'Tiramisu Cups', category: 'baked' },
];

const cupcakeFlavors = [
  'Vanilla', 'Chocolate', 'Red Velvet', 'Lemon', 'Strawberry', 'Cookies & Cream'
];

export default function OrderForm() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const deliveryMethod = watch('deliveryMethod');
  const hasCupcakes = selectedProducts.includes('cupcakes');

  const handleProductToggle = (productId: string) => {
    const updated = selectedProducts.includes(productId)
      ? selectedProducts.filter(id => id !== productId)
      : [...selectedProducts, productId];
    
    setSelectedProducts(updated);
    setValue('products', updated);
  };

  const handleFlavorToggle = (flavor: string) => {
    const updated = selectedFlavors.includes(flavor)
      ? selectedFlavors.filter(f => f !== flavor)
      : [...selectedFlavors, flavor];
    
    setSelectedFlavors(updated);
    setValue('cupcakeFlavors', updated);
  };

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          preferredDate: format(data.preferredDate, 'yyyy-MM-dd'),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit order');
      }

      toast.success('Order placed successfully! Aanya will contact you soon.');
      
      // Reset form
      setSelectedProducts([]);
      setSelectedFlavors([]);
      setDate(undefined);
      
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('Failed to submit order. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">Place Your Order</h1>
      <p className="text-muted-foreground mb-8">
        Fill out the form below and Aanya will get back to you shortly!
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Customer Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Customer Information</h2>
          
          <div>
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              {...register('customerName')}
              placeholder="Your name"
            />
            {errors.customerName && (
              <p className="text-sm text-destructive mt-1">{errors.customerName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="customerPhone">Phone Number *</Label>
            <Input
              id="customerPhone"
              {...register('customerPhone')}
              placeholder="(469) 982-4237"
              type="tel"
            />
            {errors.customerPhone && (
              <p className="text-sm text-destructive mt-1">{errors.customerPhone.message}</p>
            )}
          </div>
        </div>

        {/* Delivery Method */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Delivery Method *</h2>
          <RadioGroup
            onValueChange={(value) => setValue('deliveryMethod', value as 'Delivery' | 'Pick up')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Delivery" id="delivery" />
              <Label htmlFor="delivery">Delivery</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Pick up" id="pickup" />
              <Label htmlFor="pickup">Pick up</Label>
            </div>
          </RadioGroup>
          {errors.deliveryMethod && (
            <p className="text-sm text-destructive">{errors.deliveryMethod.message}</p>
          )}

          {deliveryMethod === 'Delivery' && (
            <div>
              <Label htmlFor="deliveryAddress">Delivery Address *</Label>
              <Textarea
                id="deliveryAddress"
                {...register('deliveryAddress')}
                placeholder="Street address, city, state, ZIP"
                rows={3}
              />
            </div>
          )}
        </div>

        {/* Products */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Select Products *</h2>
          
          <div className="space-y-2">
            <h3 className="font-medium">Hair Services</h3>
            {products.filter(p => p.category === 'hair').map((product) => (
              <div key={product.id} className="flex items-center space-x-2">
                <Checkbox
                  id={product.id}
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => handleProductToggle(product.id)}
                />
                <Label htmlFor={product.id} className="cursor-pointer">
                  {product.name}
                </Label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Baked Goods</h3>
            {products.filter(p => p.category === 'baked').map((product) => (
              <div key={product.id} className="flex items-center space-x-2">
                <Checkbox
                  id={product.id}
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => handleProductToggle(product.id)}
                />
                <Label htmlFor={product.id} className="cursor-pointer">
                  {product.name}
                </Label>
              </div>
            ))}
          </div>
          {errors.products && (
            <p className="text-sm text-destructive">{errors.products.message}</p>
          )}

          <div>
            <Label htmlFor="quantity">Quantity (if applicable)</Label>
            <Input
              id="quantity"
              {...register('quantity')}
              placeholder="e.g., 12 cupcakes, 6 brownies"
            />
          </div>
        </div>

        {/* Cupcake Flavors */}
        {hasCupcakes && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Cupcake Flavors</h2>
            <div className="grid grid-cols-2 gap-2">
              {cupcakeFlavors.map((flavor) => (
                <div key={flavor} className="flex items-center space-x-2">
                  <Checkbox
                    id={flavor}
                    checked={selectedFlavors.includes(flavor)}
                    onCheckedChange={() => handleFlavorToggle(flavor)}
                  />
                  <Label htmlFor={flavor} className="cursor-pointer">
                    {flavor}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scheduling */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Scheduling *</h2>
          
          <div>
            <Label>Preferred Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    if (newDate) setValue('preferredDate', newDate);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.preferredDate && (
              <p className="text-sm text-destructive mt-1">{errors.preferredDate.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="preferredTime">Preferred Time</Label>
            <Input
              id="preferredTime"
              {...register('preferredTime')}
              type="time"
            />
          </div>
        </div>

        {/* Payment */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Payment Method *</h2>
          <RadioGroup
            onValueChange={(value) => setValue('paymentMethod', value as 'Cash on Delivery' | 'Zelle')}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Cash on Delivery" id="cash" />
              <Label htmlFor="cash">Cash on Delivery</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Zelle" id="zelle" />
              <Label htmlFor="zelle">Zelle</Label>
            </div>
          </RadioGroup>
          {errors.paymentMethod && (
            <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>
          )}
        </div>

        {/* Additional Notes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Additional Information</h2>
          
          <div>
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              {...register('additionalNotes')}
              placeholder="Any special requests or details..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="referenceImageUrl">Reference Image URL (optional)</Label>
            <Input
              id="referenceImageUrl"
              {...register('referenceImageUrl')}
              placeholder="https://..."
              type="url"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Upload your image to a service like Imgur and paste the link here
            </p>
          </div>
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Place Order'}
        </Button>
      </form>
    </div>
  );
}