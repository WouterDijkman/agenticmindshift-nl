export default function AnswerFirst({ text }: { text: string }) {
  return (
    <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(32px, 5vw, 56px)' }}>
      <div className="container-medium">
        <p
          style={{
            maxWidth: '760px',
            margin: 0,
            paddingLeft: 'clamp(16px, 3vw, 24px)',
            borderLeft: '3px solid var(--accent-cta)',
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            fontWeight: 400,
          }}
        >
          {text}
        </p>
      </div>
    </section>
  );
}
