import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '../../hooks/use-toast';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual registration logic
      console.log('Register:', data);
      toast({
        title: 'Success',
        description: 'Your account has been created.',
      });
      onSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-semibold">
          Name
        </label>
        <input
          id="name"
          placeholder="John Doe"
          {...form.register('name')}
          className="w-full p-2 border rounded"
        />
        {form.formState.errors.name && (
          <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="email@example.com"
          {...form.register('email')}
          className="w-full p-2 border rounded"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••"
          {...form.register('password')}
          className="w-full p-2 border rounded"
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-xs">{form.formState.errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="confirmPassword" className="block text-sm font-semibold">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="••••••"
          {...form.register('confirmPassword')}
          className="w-full p-2 border rounded"
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-red-500 text-xs">{form.formState.errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-2 mt-4 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {isLoading ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
}
