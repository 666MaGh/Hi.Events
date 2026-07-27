<?php

namespace HiEvents\Mail;

use HiEvents\DomainObjects\EventSettingDomainObject;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use ReflectionObject;

abstract class BaseMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    private static bool $defaultLogoCaptured = false;

    private static ?string $defaultLogoUrl = null;

    public function __construct()
    {
        $this->afterCommit();
    }

    abstract public function envelope(): Envelope;

    abstract public function content(): Content;

    public function send($mailer)
    {
        $this->applyEventEmailLogo();

        return parent::send($mailer);
    }

    public function render()
    {
        $this->applyEventEmailLogo();

        return parent::render();
    }

    /**
     * The mail layout header reads config('app.email_logo_url'). If the concrete mail
     * carries event settings with a custom email logo, prefer that; otherwise restore
     * the instance-wide default (queue workers reuse the process, so always set it).
     */
    private function applyEventEmailLogo(): void
    {
        if (!self::$defaultLogoCaptured) {
            self::$defaultLogoUrl = config('app.email_logo_url');
            self::$defaultLogoCaptured = true;
        }

        $eventLogo = null;
        $reflection = new ReflectionObject($this);

        if ($reflection->hasProperty('eventSettings')) {
            $settings = $reflection->getProperty('eventSettings')->getValue($this);

            if ($settings instanceof EventSettingDomainObject) {
                $eventLogo = $settings->getEmailLogoUrl();
            }
        }

        config(['app.email_logo_url' => $eventLogo ?: self::$defaultLogoUrl]);
    }
}
