"use client";

import * as React from "react";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import * as SignUp from "@clerk/elements/sign-up";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import configProject from "@/config/project.app";

interface AuthModalProps {
  readonly isOpen: boolean;
  readonly mode: "sign-in" | "sign-up";
  readonly onModeChange: (mode: "sign-in" | "sign-up") => void;
}

export function AuthModal({ isOpen, mode, onModeChange }: AuthModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-md p-0 overflow-hidden bg-wa-panel border-wa-border backdrop-blur-xl"
        showCloseButton={false}
      >
        <VisuallyHidden>
          <DialogTitle>
            {mode === "sign-in"
              ? `Sign in to ${configProject.appName}`
              : `Create ${configProject.appName} Account`}
          </DialogTitle>
          <DialogDescription>
            {mode === "sign-in"
              ? `Enter your credentials to access ${configProject.appName} Web`
              : `Create a new account to start using ${configProject.appName} Web`}
          </DialogDescription>
        </VisuallyHidden>

        <div className="relative">
          {/* Header Logo */}
          <div className="bg-wa-green px-6 py-4 text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-8 h-8 text-wa-green"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
              </svg>
            </div>
            <h2 className="text-white text-lg font-medium">
              {configProject.appName} Web
            </h2>
          </div>

          {mode === "sign-in" ? (
            <div className="p-6">
              <SignIn.Root>
                {/* CAPTCHA container for bot protection */}
                <div id="clerk-captcha"></div>

                <SignIn.Step name="start">
                  <div className="text-center mb-6">
                    <h3 className="text-wa-primary text-xl font-medium mb-2">
                      Welcome back
                    </h3>
                    <p className="text-wa-secondary text-sm">
                      Sign in to continue to {configProject.appName}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <Clerk.Connection name="github" asChild>
                        <Button
                          variant="outline"
                          className="bg-wa-input border-wa-border text-wa-primary hover:bg-wa-hover transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          GitHub
                        </Button>
                      </Clerk.Connection>

                      <Clerk.Connection name="google" asChild>
                        <Button
                          variant="outline"
                          className="bg-wa-input border-wa-border text-wa-primary hover:bg-wa-hover transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Google
                        </Button>
                      </Clerk.Connection>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-wa-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-wa-panel px-2 text-wa-muted">
                          or
                        </span>
                      </div>
                    </div>

                    {/* Email Field */}
                    <Clerk.Field name="identifier" className="space-y-2">
                      <Clerk.Label className="text-wa-primary text-sm font-medium">
                        Email address
                      </Clerk.Label>
                      <Clerk.Input
                        type="email"
                        className="w-full px-3 py-2 bg-wa-input border border-wa-border text-wa-primary placeholder:text-wa-muted rounded-md focus:border-wa-green focus:outline-none focus:ring-1 focus:ring-wa-green"
                        placeholder="Enter your email address"
                      />
                      <Clerk.FieldError className="text-red-400 text-sm" />
                    </Clerk.Field>

                    <SignIn.Action submit asChild>
                      <Clerk.Loading>
                        {(isLoading) => (
                          <Button
                            className="w-full bg-wa-green hover:bg-wa-green-dark text-white transition-colors disabled:opacity-50 cursor-pointer"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Sending code...
                              </>
                            ) : (
                              "Continue"
                            )}
                          </Button>
                        )}
                      </Clerk.Loading>
                    </SignIn.Action>
                  </div>
                </SignIn.Step>

                <SignIn.Step name="verifications">
                  <SignIn.Strategy name="email_code">
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-wa-primary text-xl font-medium mb-2">
                          Check your email
                        </h3>
                        <p className="text-wa-secondary text-sm">
                          We sent a code to{" "}
                          <span className="font-medium text-wa-primary">
                            <SignIn.SafeIdentifier />
                          </span>{" "}
                          .
                        </p>
                      </div>

                      <Clerk.Field name="code" className="space-y-2">
                        <Clerk.Label className="text-wa-primary text-sm font-medium">
                          Email code
                        </Clerk.Label>
                        <Clerk.Input
                          className="w-full px-3 py-2 bg-wa-input border border-wa-border text-wa-primary placeholder:text-wa-muted rounded-md focus:border-wa-green focus:outline-none focus:ring-1 focus:ring-wa-green text-center text-lg tracking-widest"
                          placeholder="Enter code"
                        />
                        <Clerk.FieldError className="text-red-400 text-sm" />
                      </Clerk.Field>

                      <SignIn.Action submit asChild>
                        <Clerk.Loading>
                          {(isLoading) => (
                            <Button
                              className="w-full bg-wa-green hover:bg-wa-green-dark text-white transition-colors disabled:opacity-50 cursor-pointer"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                  Verifying...
                                </>
                              ) : (
                                "Verify"
                              )}
                            </Button>
                          )}
                        </Clerk.Loading>
                      </SignIn.Action>

                      <div className="text-center">
                        <SignIn.Action resend asChild>
                          <Button
                            variant="link"
                            className="text-wa-green hover:text-wa-green-dark p-0 h-auto text-sm cursor-pointer"
                          >
                            Resend code
                          </Button>
                        </SignIn.Action>
                      </div>
                    </div>
                  </SignIn.Strategy>
                </SignIn.Step>
              </SignIn.Root>

              <div className="mt-6 text-center border-t border-wa-border pt-4">
                <span className="text-wa-secondary text-sm">
                  Don&apos;t have an account?{" "}
                </span>
                <Button
                  variant="link"
                  className="text-wa-green hover:text-wa-green-dark p-0 h-auto font-medium cursor-pointer"
                  onClick={() => onModeChange("sign-up")}
                >
                  Create account
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-wa-primary text-xl font-medium mb-2">
                  Create account
                </h3>
                <p className="text-wa-secondary text-sm">
                  Join {configProject.appName} to start messaging
                </p>
              </div>

              <SignUp.Root>
                {/* CAPTCHA container for bot protection */}
                <div id="clerk-captcha"></div>

                <SignUp.Step name="start">
                  <div className="space-y-4">
                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <Clerk.Connection name="github" asChild>
                        <Button
                          variant="outline"
                          className="bg-wa-input border-wa-border text-wa-primary hover:bg-wa-hover transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          GitHub
                        </Button>
                      </Clerk.Connection>

                      <Clerk.Connection name="google" asChild>
                        <Button
                          variant="outline"
                          className="bg-wa-input border-wa-border text-wa-primary hover:bg-wa-hover transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Google
                        </Button>
                      </Clerk.Connection>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-wa-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-wa-panel px-2 text-wa-muted">
                          or
                        </span>
                      </div>
                    </div>

                    {/* Email Field */}
                    <Clerk.Field name="emailAddress" className="space-y-2">
                      <Clerk.Label className="text-wa-primary text-sm font-medium">
                        Email address
                      </Clerk.Label>
                      <Clerk.Input
                        type="email"
                        className="w-full px-3 py-2 bg-wa-input border border-wa-border text-wa-primary placeholder:text-wa-muted rounded-md focus:border-wa-green focus:outline-none focus:ring-1 focus:ring-wa-green"
                        placeholder="Enter your email address"
                      />
                      <Clerk.FieldError className="text-red-400 text-sm" />
                    </Clerk.Field>

                    <SignUp.Action submit asChild>
                      <Clerk.Loading>
                        {(isLoading) => (
                          <Button
                            className="w-full bg-wa-green hover:bg-wa-green-dark text-white transition-colors disabled:opacity-50 cursor-pointer"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Creating account...
                              </>
                            ) : (
                              "Continue"
                            )}
                          </Button>
                        )}
                      </Clerk.Loading>
                    </SignUp.Action>
                  </div>
                </SignUp.Step>

                <SignUp.Step name="verifications">
                  <SignUp.Strategy name="email_code">
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-wa-primary text-xl font-medium mb-2">
                          Check your email
                        </h3>
                        <p className="text-wa-secondary text-sm">
                          We sent a verification code to your email address.
                        </p>
                      </div>

                      <Clerk.Field name="code" className="space-y-2">
                        <Clerk.Label className="text-wa-primary text-sm font-medium">
                          Email code
                        </Clerk.Label>
                        <Clerk.Input
                          className="w-full px-3 py-2 bg-wa-input border border-wa-border text-wa-primary placeholder:text-wa-muted rounded-md focus:border-wa-green focus:outline-none focus:ring-1 focus:ring-wa-green text-center text-lg tracking-widest"
                          placeholder="Enter code"
                        />
                        <Clerk.FieldError className="text-red-400 text-sm" />
                      </Clerk.Field>

                      <SignUp.Action submit asChild>
                        <Clerk.Loading>
                          {(isLoading) => (
                            <Button
                              className="w-full bg-wa-green hover:bg-wa-green-dark text-white transition-colors disabled:opacity-50 cursor-pointer"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                  Verifying...
                                </>
                              ) : (
                                "Verify"
                              )}
                            </Button>
                          )}
                        </Clerk.Loading>
                      </SignUp.Action>

                      <div className="text-center">
                        <SignUp.Action resend asChild>
                          <Button
                            variant="link"
                            className="text-wa-green hover:text-wa-green-dark p-0 h-auto text-sm cursor-pointer"
                          >
                            Resend code
                          </Button>
                        </SignUp.Action>
                      </div>
                    </div>
                  </SignUp.Strategy>
                </SignUp.Step>
              </SignUp.Root>

              <div className="mt-6 text-center border-t border-wa-border pt-4">
                <span className="text-wa-secondary text-sm">
                  Already have an account?{" "}
                </span>
                <Button
                  variant="link"
                  className="text-wa-green hover:text-wa-green-dark p-0 h-auto font-medium cursor-pointer"
                  onClick={() => onModeChange("sign-in")}
                >
                  Sign in
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
