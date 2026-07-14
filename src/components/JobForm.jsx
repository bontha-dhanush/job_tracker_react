import { useEffect, useState } from 'react';
import { EMPTY_JOB, PLATFORMS, STATUSES } from '../constants/jobOptions';
import { validateJob } from '../utils/validation';
import './JobForm.css';

function JobForm({ isOpen, onClose, onSubmit, initialJob = null }) {
  const [form, setForm] = useState(EMPTY_JOB);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm(initialJob ? { ...initialJob } : { ...EMPTY_JOB });
      setErrors({});
    }
  }, [isOpen, initialJob]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateJob(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      company: form.company.trim(),
      jobTitle: form.jobTitle.trim(),
      platform: form.platform,
      appliedDate: form.appliedDate,
      status: form.status,
      notes: form.notes.trim(),
    });

    onClose();
  };

  const title = initialJob ? 'Edit Job Application' : 'Add Job Application';

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-form-title"
      >
        <div className="modal__header">
          <h2 id="job-form-title">{title}</h2>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form className="job-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="Enter company name"
                className={errors.company ? 'input-error' : ''}
              />
              {errors.company && (
                <span className="field-error">{errors.company}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="Enter job title"
                className={errors.jobTitle ? 'input-error' : ''}
              />
              {errors.jobTitle && (
                <span className="field-error">{errors.jobTitle}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="platform">Platform</label>
              <select
                id="platform"
                name="platform"
                value={form.platform}
                onChange={handleChange}
                className={errors.platform ? 'input-error' : ''}
              >
                <option value="" disabled>
                  Select Platform
                </option>

                {PLATFORMS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {errors.platform && (
                <span className="field-error">{errors.platform}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="appliedDate">Applied Date</label>
              <input
                id="appliedDate"
                name="appliedDate"
                type="date"
                value={form.appliedDate}
                onChange={handleChange}
                className={errors.appliedDate ? 'input-error' : ''}
              />
              {errors.appliedDate && (
                <span className="field-error">{errors.appliedDate}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className={errors.status ? 'input-error' : ''}
            >
              <option value="" disabled>
                Select Status
              </option>

              {STATUSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {errors.status && (
              <span className="field-error">{errors.status}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="notes">
              Notes <span className="label-optional">(Optional)</span>
            </label>

            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              placeholder="Interview details, recruiter name, etc."
            />
          </div>

          <div className="modal__actions">
            <button
              type="button"
              className="btn btn--outline"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn--primary">
              {initialJob ? 'Save Changes' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;